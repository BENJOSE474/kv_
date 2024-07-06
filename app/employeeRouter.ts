// import express from "express";
// import Employee from "../src/entity/Employee.entity";
// import dataSource from "./datasource";
// const employeeRouter = express.Router();
// let count = 2;
// const employees: Employee[] = [
//   {
//     id: 1,
//     email: "adgfc@gmail.com",
//     name: "csdvc",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     deletedAt: new Date(),
//   },
//   {
//     id: 2,
//     email: "scsacc@gmail.com",
//     name: "cdsdvc",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     deletedAt: new Date(),
//   },
// ];
// employeeRouter.get("/", async (req, res) => {
//   const employeeRepository = dataSource.getRepository(Employee);
//   const employees = await employeeRepository.find();
//   res.status(200).send(employees);
// });

// employeeRouter.post("/", async (req, res) => {
//   const employeeRepository = dataSource.getRepository(Employee);
//   const newEmployee = new Employee();
//   newEmployee.email = req.body.email;
//   newEmployee.name = req.body.name;
//   const savedEmployee = await employeeRepository.save(newEmployee);
//   res.status(200).send(savedEmployee);
// });
// employeeRouter.get("/:id", async (req, res) => {
//   const employeeRepository = dataSource.getRepository(Employee);
//   const employees = await employeeRepository.findOneBy({
//     id: Number(req.params.id),
//   });
//   res.status(200).send(employees);
// });

// employeeRouter.put("/:id", async (req, res) => {
//   const employeeRepository = dataSource.getRepository(Employee);
//   const employees = await employeeRepository.findOneBy({
//     id: Number(req.params.id),
//   });
//   employees.email = req.body.email;
//   employees.name = req.body.name;
//   const savedEmployee = await employeeRepository.save(employees);

//   res.status(200).send(savedEmployee);
// });

// employeeRouter.delete("/:id", async (req, res) => {
//   const employeeRepository = dataSource.getRepository(Employee);
//   const result = await employeeRepository.softDelete(Number(req.params.id));
//   res.status(200).send(result);
// });

// // employeeRouter.get("/:id", (req, res) => {
// //   console.log(req.params["employeeId"]);
// //   const employee = employees.find(
// //     (record) => record.id == Number(req.params.id)
// //   );
// //   res.status(200).send(employee);
// // });

// //   employees.push(employee);
// //   res.status(201).send("create an employee");
// // });

// // employeeRouter.put("/:id", (req, res) => {
// //   console.log(req.url);
// //   const employee = employees.find(
// //     (record) => record.id == Number(req.params.id)
// //   );

// //   employee.id = req.body.id;
// //   employee.name = req.body.name;
// //   employee.email = req.body.email;
// //   employee.updatedAt = new Date();
// //   employee.createdAt = new Date();
// //   console.log("updated employees");
// //   res.status(200).send("created an employee");
// // });

// // employeeRouter.delete("/:id", (req, res) => {
// //   console.log(req.url);
// //   const index = employees.findIndex(
// //     (record) => record.id == Number(req.params.id)
// //   );

// //   employees.splice(index, 1);
// //   res.status(200).send("deleted an employee");
// // });

// export default employeeRouter;
