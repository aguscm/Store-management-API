import express from "express";
const router = express.Router();

//Interfaces
import type { IResponse } from "../interfaces";

// Helpers
import { loginUser } from "../helpers/user";

router.route("/").post(function (req, res) {
  let response: IResponse;
  if (
    req.body.email === loginUser.email &&
    req.body.password === loginUser.password
  ) {
    response = {
      error: false,
      code: 200,
      message: "Login success",
      data: {
        email: loginUser.email,
        name: loginUser.name,
        lastName: loginUser.lastName,
        tokenId: loginUser.tokenId,
      },
    };
  } else {
    response = {
      error: true,
      code: 401,
      message: "Login failed",
    };
  }
  res.send(response);
});

module.exports = router;
