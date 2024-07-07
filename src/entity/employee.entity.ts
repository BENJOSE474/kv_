import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import AbstractEntity from "./abstarct_entity";
import Address from "./address.entity";
import { Role } from "../utils/role.enum";
import EmployeeDepartment from "./employeeDepartment.entity";
@Entity()
class Employee extends AbstractEntity {
  @Column()
  id: number;
 
  @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    age: number;

    @OneToOne(() => Address, (address) => address.employee, {
        cascade: true,
        onDelete: "CASCADE",
    })
    address: Address;

    @Column({ nullable: true })
    password: string;

    @Column({ nullable: true })
    role: Role;

    @OneToMany(()=> EmployeeDepartment, (employeeDepartment) => employeeDepartment.employee)
    employeeDepartments: EmployeeDepartment[];

}
export default Employee;
