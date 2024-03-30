import express from "express";
import type { IInvoice } from "../interfaces";
import requireLogin from "../middlewares/requireLogin";
const allInvoices = require("../data/invoices.json");

const router = express.Router();

let invoiceList: IInvoice[] = allInvoices;
const getNextNumberInvoiceId = (): number => {
  return allInvoices[allInvoices.length - 1].id++;
};

router
  .route("/")
  .post(requireLogin, function (req, res) {
    const { idProduct, idClient, discount, date, comment } = req.body;
    let response: Object;
    if (!idProduct || !idClient || !date) {
      response = {
        error: true,
        code: 400,
        message: "Product ID, Client ID and Date fields are required",
      };
    } else {
      const newInvoice: IInvoice = {
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
    res.send(response);
  })
  .put(requireLogin, function (req, res) {
    const { id, idClient, idProduct, discount, date, comment } = req.body;
    let response: Object;
    if (!id) {
      response = {
        error: true,
        code: 400,
        message: "ID field is required",
      };
    } else {
      const invoiceToEdit = allInvoices.find(
        (invoice: IInvoice) => (invoice.id = id)
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
    res.send(response);
  });

module.exports = router;
