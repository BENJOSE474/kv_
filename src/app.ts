import { Request, Response } from "express";
import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
config();
import loggerMiddleWare from "./middleware/logger.middleware";
import dataSource from "./db/data_source.db";
import employeeRouter from "./routes/employee.routes";
import errorMiddleware from "./middleware/error.middleware";
import departmentRouter from "./routes/department.routes";

const server = express();
server.use(bodyParser.json());

server.use(loggerMiddleWare);

server.get("/", (req: Request, res: Response) => {
  console.log(req.url);
  res.status(200).send("Hello world");
});

server.use("/employees", employeeRouter);
server.use("/departments", departmentRouter);

server.use(errorMiddleware);

(async () => {
  try {
    await dataSource.initialize();
  } catch (e) {
    console.log("Failed", e);
    process.exit(1);
  }
  server.listen(3002, () => {
    console.log("server listening to 3002");
  });
})();
