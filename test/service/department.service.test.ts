import DepartmentRepository from "../../src/repository/department.repository";
import DepartmentService from "../../src/service/department.service";
import Department from "../../src/entity/department.entity";
import HttpException from "../../src/exceptions/http.exceptions";
import { when } from "jest-when";

describe("Department Service", () => {
  let departmentRepository: jest.Mocked<DepartmentRepository>;
  let departmentService: DepartmentService;

  beforeEach(() => {
    const dataSource = {
      getRepository: jest.fn(),
    };
    departmentRepository = new DepartmentRepository(
      dataSource.getRepository(Department)
    ) as jest.Mocked<DepartmentRepository>;
    departmentService = new DepartmentService(departmentRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all departments", async () => {
    // Mock departmentRepository.find to return an empty array
    jest.spyOn(departmentRepository, "find").mockResolvedValue([]);

    // Call the method under test
    const result = await departmentService.getAllDepartments();

    // Assert the result
    expect(result).toEqual([]);
    expect(departmentRepository.find).toHaveBeenCalledTimes(1);
  });

  it("should return department by id", async () => {
    const departmentId = 1;
    const departmentName = "Sample Department";
    const mockDepartment = new Department();
    mockDepartment.id = departmentId;
    mockDepartment.name = departmentName;

    // Mock departmentRepository.findOneBy to return the mock department
    const findOneByMock = jest.fn().mockResolvedValue(mockDepartment);
    departmentRepository.findOneBy = findOneByMock;

    // Call the method under test
    const result = await departmentService.getDepartmentById(departmentId);

    // Assert the result
    expect(result).toEqual(mockDepartment);
    expect(findOneByMock).toHaveBeenCalledWith({ id: departmentId });
  });

  it("should throw HttpException when getting department by non-existent id", async () => {
    const departmentId = 999;

    // Mock departmentRepository.findOneBy to return undefined (not found)
    departmentRepository.findOneBy = jest.fn().mockResolvedValue(undefined);

    // Call the method under test and expect it to throw an HttpException
    await expect(departmentService.getDepartmentById(departmentId)).rejects.toThrow(HttpException);
    expect(departmentRepository.findOneBy).toHaveBeenCalledWith({ id: departmentId });
  });

  it("should create a new department", async () => {
    const departmentName = "New Department";
    const newDepartment = new Department();
    newDepartment.name = departmentName;

    // Mock departmentRepository.create to return the new department
    const createMock = jest.fn().mockResolvedValue(newDepartment);
    departmentRepository.create = createMock;

    // Call the method under test
    const createdDepartment = await departmentService.createDepartment(departmentName);

    // Assert the result
    expect(createdDepartment).toEqual(newDepartment);
    expect(createMock).toHaveBeenCalledWith(newDepartment);
  });

  it("should update an existing department", async () => {
    const departmentId = 1;
    const updatedDepartmentName = "Updated Department";
    const departmentToUpdate = new Department();
    departmentToUpdate.id = departmentId;
    departmentToUpdate.name = updatedDepartmentName;

    // Mock departmentRepository.findOneBy to return the department to update
    const findOneByMock = jest.fn().mockResolvedValue(departmentToUpdate);
    departmentRepository.findOneBy = findOneByMock;

    // Mock departmentRepository.save to return the updated department
    const saveMock = jest.fn().mockResolvedValue(departmentToUpdate);
    departmentRepository.save = saveMock;

    // Call the method under test
    const updatedDepartment = await departmentService.updateDepartment(departmentId, { name: updatedDepartmentName });

    // Assert the result
    expect(updatedDepartment).toEqual(departmentToUpdate);
    expect(findOneByMock).toHaveBeenCalledWith({ id: departmentId });
    expect(saveMock).toHaveBeenCalledWith(departmentToUpdate);
  });

  it("should throw HttpException when updating a non-existent department", async () => {
    const departmentId = 999;

    // Mock departmentRepository.findOneBy to return undefined (not found)
    departmentRepository.findOneBy = jest.fn().mockResolvedValue(undefined);

    // Call the method under test and expect it to throw an HttpException
    await expect(departmentService.updateDepartment(departmentId, { name: "Updated Department" })).rejects.toThrow(HttpException);
    expect(departmentRepository.findOneBy).toHaveBeenCalledWith({ id: departmentId });
  });

  it("should delete an existing department", async () => {
    const departmentId = 1;
    const departmentToDelete = new Department();
    departmentToDelete.id = departmentId;

    // Mock departmentRepository.findOneBy to return the department to delete
    const findOneByMock = jest.fn().mockResolvedValue(departmentToDelete);
    departmentRepository.findOneBy = findOneByMock;

    // Mock departmentRepository.softDelete to resolve successfully
    const softDeleteMock = jest.fn().mockResolvedValue(undefined);
    departmentRepository.softDelete = softDeleteMock;

    // Call the method under test
    await departmentService.deleteDepartment(departmentId);

    // Assert the result
    expect(findOneByMock).toHaveBeenCalledWith({ id: departmentId });
    expect(softDeleteMock).toHaveBeenCalledWith(departmentToDelete);
  });

  it("should throw HttpException when deleting a non-existent department", async () => {
    const departmentId = 999;

    // Mock departmentRepository.findOneBy to return undefined (not found)
    departmentRepository.findOneBy = jest.fn().mockResolvedValue(undefined);

    // Call the method under test and expect it to throw an HttpException
    await expect(departmentService.deleteDepartment(departmentId)).rejects.toThrow(HttpException);
    expect(departmentRepository.findOneBy).toHaveBeenCalledWith({ id: departmentId });
  });
});
