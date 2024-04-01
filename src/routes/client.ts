import express from "express";
import type { IInvoice, IResponse } from "../interfaces";
import requireLogin from "../middlewares/requireLogin";
const allInvoices = require("../data/invoices.json");

const router = express.Router();

let invoiceList: IInvoice[] = allInvoices;

router.route("/:clientID/invoices").get(requireLogin, function (req, res) {
  const clientID = req.params.clientID;
  let response: IResponse;
  if (!clientID) {
    response = {
      error: true,
      code: 400,
      message: "Client ID is required",
    };
  } else {
    let invoices: IInvoice[] = invoiceList.filter(
      (invoice) => invoice.idClient === clientID
    );
    if (invoices.length > 0) {
      response = {
        error: false,
        code: 200,
        message: `Invoices from client ${clientID}`,
        data: invoices,
      };
    } else {
      response = {
        error: true,
        code: 404,
        message: "Client not found",
      };
    }
  }
  res.send(response);
});

module.exports = router;
