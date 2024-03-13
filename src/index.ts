const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const allClients = require("./data/clients.json")
const allProducts = require("./data/products.json")
const allInvoices = require("./data/invoices.json")


const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface Client {
  id: string
  name: string
  surname: string
}

interface Invoice {
  id: string,
  idProduct: string,
  idClient: string,
  discount: number,
  invoiceDate: Date,
  comment?: string
}

let productList: Product[] = allProducts
let clientList: Client[] = allClients
let invoiceList: Invoice[] = allInvoices

const findItemInList = (array: any, id: string) => {
  return array.find((item: any) => item.id === id);
};


app.get("/", function (req, res) {
  let response : any = {
    error: true,
    code: 200,
    message:
      "API REST working. You can use /login or any available endpoint.",
  };
  res.send(response);
});

app.get("/products", function (req, res) {
  let response : any = productList
  res.send(response);
});

app.get("/clients", function (req, res) {
  let response : any = clientList
  res.send(response);
});

app.get("/invoices", function (req, res) {
  let response : any = invoiceList
  res.send(response);
});

app
  .route("/client/:clientID/invoices")
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
        let invoices : Invoice[] = invoiceList.filter(
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

  })

app.listen(port, () => {
  console.log("Server started. Port 3000");
  console.log("Login user created");
});
