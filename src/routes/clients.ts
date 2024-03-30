import express from "express";
import type { IClient } from "../interfaces";
import requireLogin from "../middlewares/requireLogin";
const allClients = require("../data/clients.json");

const router = express.Router();

let clientList: IClient[] = allClients;

router.route("/").get(requireLogin, function (req, res) {
  let response = {
    error: false,
    code: 200,
    data: clientList,
  };

  res.send(response);
});

module.exports = router;
