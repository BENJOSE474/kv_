import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { jwtPayload } from "../utils/jwtPayLoad";
import { RequestWithUser } from "../utils/requestWithUser";
import HttpException from "../exceptions/http.exceptions";

export const authorize = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = getTokenFromRequestHeader(req);
    const payload = jsonwebtoken.verify(token, "test") as jwtPayload;

    if (payload.role !== "HR") {
      throw new HttpException(403, "Access forbidden. Only HR role allowed.");
    }

    req.name = payload.name;
    req.email = payload.email;
    req.role = payload.role;

    return next();
  } catch (error) {
    return next(error);
  }
};

const getTokenFromRequestHeader = (req: RequestWithUser) => {
  const bearerToken = req.header("Authorization");
  const token = bearerToken ? bearerToken.replace("Bearer ", "") : "";
  return token;
};
