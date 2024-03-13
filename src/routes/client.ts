import express from 'express'
import type { IInvoice } from "../interfaces";
const allInvoices = require("../data/invoices.json")

const router = express.Router()

let invoiceList: IInvoice[] = allInvoices

router
  .route("/:clientID/invoices")
  .get(function (req, res) {
    const clientID = req.params.clientID;
    // if (req.headers.authorization === loginUser.tokenId) {
    if (!clientID) {
      let response = {
        error: true,
        code: 400,
        message: "Client ID is required",
      };
    } else {
      let invoices: IInvoice[] = invoiceList.filter(
        (invoice) => invoice.idClient === clientID
      );
      if (invoices.length > 0) {
        let response = {
          error: false,
          code: 200,
          message: `Invoices from client ${clientID}`,
          data: invoices,
        };
        res.send(response);
      } else {
        let response = {
          error: true,
          code: 404,
          message: "Pokemon not found",
        };

      }
    }
    // } else {
    //   response = {
    //     error: true,
    //     code: 401,
    //     message: "Unauthorized",
    //   };
    // }
  });

module.exports = router
