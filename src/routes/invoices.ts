import express from "express";
import type { IResponse } from "../interfaces";
import requireLogin from "../middlewares/requireLogin";
import data from "../data/data";

const router = express.Router();

router.route("/").get(function (req, res) {
  let response: IResponse;
  response = {
    error: false,
    code: 200,
    data: data.getInvoices(),
  };

  res.status(response.code).send(response);;
});

module.exports = router;
