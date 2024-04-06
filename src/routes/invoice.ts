import express from "express";
import type { IInvoice, IInvoiceShort, IResponse } from "../interfaces";
import requireLogin from "../middlewares/requireLogin";
const allInvoices = require("../data/invoices.json");

const router = express.Router();

let invoiceList: IInvoiceShort[] = allInvoices;
console.log(invoiceList)
const getNextNumberInvoiceId = (): number => {
  return allInvoices[allInvoices.length - 1].id++;
};

router.route("/").post(requireLogin, function (req, res) {
  const { idProduct, idClient, discount, date, comment } = req.body;
  let response: IResponse;
  if (!idProduct || !idClient || !date) {
    response = {
      error: true,
      code: 400,
      message: "Product ID, Client ID and Date fields are required",
    };
  } else {
    const newInvoice: IInvoiceShort = {
      id: getNextNumberInvoiceId(),
      idClient: idClient,
      idProduct: idProduct,
      discount: discount || 0,
      date: date,
      comment: comment || "",
    };
    invoiceList.push(newInvoice);
    response = {
      error: false,
      code: 200,
      message: "New invoice created",
      data: newInvoice,
    };
  }
  res.status(response.code).send(response);;
});

router.route("/:invoiceID").put(function (req, res) {
  const { idClient, idProduct, discount, date, comment } = req.body;
  let response: IResponse;
  const invoiceID = Number(req.params.invoiceID);
  if (!invoiceID) {
    response = {
      error: true,
      code: 400,
      message: "ID field is required",
    };
  } else {
    let invoiceToEdit : IInvoiceShort = invoiceList.find(
      (invoice) => (invoice.id === invoiceID)
    );
    
    if (!invoiceToEdit) {
      response = {
        error: true,
        code: 400,
        message: "Invoice not found",
      };
    } else {
      invoiceToEdit.idClient = idClient || invoiceToEdit.idClient;
      invoiceToEdit.idProduct = idProduct || invoiceToEdit.idProduct;
      invoiceToEdit.discount = discount || invoiceToEdit.discount;
      invoiceToEdit.date = date || invoiceToEdit.date;
      invoiceToEdit.comment = comment || invoiceToEdit.comment;
      response = {
        error: false,
        code: 200,
        message: "Invoice updated",
        data: invoiceToEdit,
      };

      
    }
  }
  res.status(response.code).send(response);
});

module.exports = router;
