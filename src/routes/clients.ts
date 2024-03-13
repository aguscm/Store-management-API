import express from 'express'
import type { IProduct } from "../interfaces";
const allClients = require("../data/clients.json")

const router = express.Router()

let clientList: IProduct[] = allClients

router
    .route("/")
    .get(function (req, res) {
        let response = {
            error: false,
            code: 200,
            data: clientList,
        };

        res.send(response);
    });

module.exports = router
