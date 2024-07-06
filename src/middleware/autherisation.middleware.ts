import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { jwtPayload } from "../utils/jwtPayLoad";
import { RequestWithUser } from "../utils/requestWithUser";

export const authorize = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = getTokenFromRequestHeader(req);
    const payload = jsonwebtoken.verify(token, "test");
    req.name = (payload as jwtPayload).name;
    req.email = (payload as jwtPayload).email;
    req.role = (payload as jwtPayload).role;
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
