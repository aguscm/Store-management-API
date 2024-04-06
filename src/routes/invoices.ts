import express from "express";
import type { IInvoice, IInvoiceShort, IProduct, IClient, IResponse } from "../interfaces";
import requireLogin from "../middlewares/requireLogin";
const allInvoices = require("../data/invoices.json");
const allProducts = require("../data/products.json");
const allClients = require("../data/clients.json");

const router = express.Router();

let invoiceList: IInvoiceShort[] = allInvoices;
let productList: IProduct[] = allProducts;
let clientList: IClient[] = allClients;
let invoiceFullList: IInvoice[] = invoiceList.map((invoice: IInvoiceShort) => {
  const product = productList.find((p: IProduct) => p.id === invoice.idProduct);
  const client = clientList.find((c: IClient) => c.id === invoice.idClient);

  // Create a deep copy of the invoice object
  const invoiceCopy = JSON.parse(JSON.stringify(invoice));

  delete invoiceCopy.idProduct;
  delete invoiceCopy.idClient;

  return {
    ...invoiceCopy,
    product,
    client,
  };
});
router.route("/").get(requireLogin, function (req, res) {
  let response: IResponse;
  response = {
    error: false,
    code: 200,
    data: invoiceFullList,
  };

  res.status(response.code).send(response);;
});

module.exports = router;
