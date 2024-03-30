import express from "express";
import type { IInvoice } from "../interfaces";
import requireLogin from "../middlewares/requireLogin";
const allInvoices = require("../data/invoices.json");

const router = express.Router();

let invoiceList: IInvoice[] = allInvoices;

router.route("/").get(requireLogin, function (req, res) {
  let response = {
    error: false,
    code: 200,
    data: invoiceList,
  };

  res.send(response);
});

module.exports = router;
