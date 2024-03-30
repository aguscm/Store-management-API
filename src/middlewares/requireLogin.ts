import express from "express";

import { loginUser } from "../helpers/user";
import { IResponse } from "../interfaces";

const requireLogin = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.headers.authorization === loginUser.tokenId) {
    next();
  } else {
    let response: IResponse = {
      error: true,
      code: 401,
      message: "Unauthorized",
    };
    res.send(response);
  }
};

export default requireLogin;
