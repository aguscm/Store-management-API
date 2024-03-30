const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Helpers
import { loginUser } from "./helpers/user";

// Define routes
const clientRoutes = require("./routes/client");
const clientsRoutes = require("./routes/clients");
const productsRoutes = require("./routes/products");
const invoicesRoutes = require("./routes/invoices");
const invoiceRoutes = require("./routes/invoice");
const loginRoutes = require("./routes/login");

// Init
export const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Start point
app.get("/", function (req, res) {
  let response: any = {
    error: true,
    code: 200,
    message: "API REST working. You can use /login or any available endpoint.",
  };
  res.send(response);
});

// Routes
app.use("/login", loginRoutes);
app.use("/products", productsRoutes);
app.use("/client", clientRoutes);
app.use("/clients", clientsRoutes);
app.use("/invoices", invoicesRoutes);
app.use("/invoice", invoiceRoutes);

// Listen port
app.listen(port, () => {
  console.log("Server started. Port 3000");
  console.log("Login user created");
  console.log("email: " + loginUser.email);
  console.log("password: " + loginUser.password);
});
