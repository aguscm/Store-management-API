import express from "express";
import type { IInvoiceShort, IResponse } from "../interfaces";
import requireLogin from "../middlewares/requireLogin";
import data  from "../data/data";

const router = express.Router();


router.route("/").post( function (req, res) {
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
      id: null,
      idClient: idClient,
      idProduct: idProduct,
      discount: discount || 0,
      date: date,
      comment: comment || "",
    };
    data.addInvoice(newInvoice);
    response = {
      error: false,
      code: 200,
      message: "New invoice created",
      data: newInvoice,
    };
  }
  res.status(response.code).send(response);;
});

router.route("/:invoiceID").put( function (req, res) {
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
    const invoiceToEdit = data.findInvoiceById(invoiceID);
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
      data.updateInvoice(invoiceID, invoiceToEdit);
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

router.route("/:invoiceID").delete( function (req, res) {
let response: IResponse;
  const invoiceID = Number(req.params.invoiceID);
  if (!invoiceID) {
    response = {
      error: true,
      code: 400,
      message: "ID field is required",
    };
  } else {
    const invoiceToDelete = data.findInvoiceById(invoiceID);
    if (!invoiceToDelete) {
      response = {
        error: true,
        code: 400,
        message: "Invoice not found",
      };
    } else {
      data.removeInvoice(invoiceID);
      response = {
        error: false,
        code: 200,
        message: "Invoice deleted",
      };
    }
  }
  res.status(response.code).send(response);
});

module.exports = router;
