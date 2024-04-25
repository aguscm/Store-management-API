import express from "express";
import type { IInvoice, IResponse } from "../interfaces";
import requireLogin from "../middlewares/requireLogin";
import data from "../data/data";

const router = express.Router();

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
    let invoices: IInvoice[] = data.getInvoicesFromClient(Number(clientID));
    if (invoices?.length > 0) {
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
  res.status(response.code).send(response);;
});

module.exports = router;
