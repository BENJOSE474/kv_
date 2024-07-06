// const http = require("http");
// const server = http.createServer((req, res) => {
//   console.log(req.url);
//   res.writeHead(200);
//   res.end("hello world");
// });

// server.listen(3000, () => {
//   console.log("server is running on port 3000");
// });
//const express = require("express");
// const server = new express();
// server.get("/", (req, res) => {
//   console.log(req.url);
//   res.status(200).send("hello");
// });

// server.listen(3000, () => {
//   console.log("server is running on port 3000");
// });

// interface Profile {
//   name: string;
//   age: number;
// }
// interface Data {
//   profile: Profile;
// }

import logMiddleware from "../src/middleware/logger.middleware";
import { Request, Response } from "express";

const express = require("express");
const server = new express();
import bodyParser from "body-parser";
import employeeRouter from "./routes/employee.routes";
import loggerMiddleWare  from "./middleware/logger.middleware";
import dataSource from "./db/data_source.db";
import errorMiddleware from "./middleware/error.middleware";
server.use(bodyParser.json());

server.use(logMiddleware);

server.use("/employees", employeeRouter);
server.use(errorMiddleware);

server.get("/", (req: Request, res: Response) => {
  console.log(req.url);
  res.status(200).send("hello world");
});

server.listen(3000, () => {
  console.log("server is running on port 3000");
});

(async () => {
  try {
    await dataSource.initialize();
  } catch (e) {
    console.log("Failed", e);
    process.exit(1);
  }
  server.listen(3001, () => {
    console.log("server listening to 3001");
  });
})();
