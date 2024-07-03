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

interface Profile {
  name: string;
  age: number;
}
interface Data {
  profile: Profile;
}
import {Request,Response}from "express";
const express = require("express");
const server = new express();
server.get("/", (req:Request, res:Response) => {
  console.log(req.url);
  res.status(200).send("hello");
});
server.get("/getdata", (req:Request, res:Response) => {
  let data: Data = {
    profile: {
      name: "ben",
      age: 22,
    },
  };

  console.log(data.profile.name);
  res.status(200).send(data);
});

server.listen(3000, () => {
  console.log("server is running on port 3000");
});
