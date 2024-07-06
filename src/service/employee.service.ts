import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import HttpException from "../exceptions/http.exceptions";
import EmployeeRepository from "../repository/employee.repository";
import { Role } from "../utils/role.enum";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
class EmployeeService {
  constructor(private employeeRespository: EmployeeRepository) {}

  getAllEmployees = async (): Promise<Employee[]> => {
    return this.employeeRespository.find();
  };

  getEmployeeById = async (id: number): Promise<Employee | null> => {
    return this.employeeRespository.findOneBy({ id });
  };

  createEmployee = async (
    email: string,
    name: string,
    age: number,
    address: any,
    password: string,
    role: Role
  ): Promise<Employee> => {
    const newEmployee = new Employee();
    newEmployee.name = name;
    newEmployee.email = email;
    newEmployee.age = age;
    newEmployee.password = password ? await bcrypt.hash(password, 10) : "";
    newEmployee.role = role;

    const newAddress = new Address();
    newAddress.line1 = address.line1;
    newAddress.pincode = address.pincode;

    newEmployee.address = newAddress;

    return this.employeeRespository.create(newEmployee);
  };

  updateEmployee = async (
    id: number,
    employee: Partial<Employee>
  ): Promise<Employee> => {
    const employeeToUpdate = await this.getEmployeeById(id);
    if (!employeeToUpdate) {
      throw new HttpException(404, `No employee found with id :${id}`);
    }

    employeeToUpdate.name = employee.name;
    employeeToUpdate.email = employee.email;
    employeeToUpdate.age = employee.age;
    employeeToUpdate.address.line1 = employee.address.line1;
    employeeToUpdate.address.pincode = employee.address.pincode;
    return this.employeeRespository.save(employeeToUpdate);
  };

  deleteEmployee = async (id: number): Promise<void> => {
    const employee = await this.getEmployeeById(id);
    return this.employeeRespository.softDelete(employee);
  };

  loginEmployee = async (email: string, password: string) => {
    const employee = await this.employeeRespository.findOneBy({ email });
    if (!employee) {
      throw new HttpException(404, `No employee found with id :${email}`);
    }
    const result = await bcrypt.compare(password, employee.password);
    if (!result) {
      throw new HttpException(404, `No employee found with id :${email}`);
    }

    const payload = {
      name: employee.name,
      email: employee.email,
      role: employee.role,
    };
    const token = jsonwebtoken.sign(payload, "test", {
      expiresIn: "24h",
    });
    return { token };
  };
}

export default EmployeeService;
