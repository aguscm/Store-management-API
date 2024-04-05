import express from 'express'
import type { IProduct } from "../interfaces";
const allProducts = require("../data/products.json")

const router = express.Router()

let productList: IProduct[] = allProducts

router
    .route("/")
    .get(function (req, res) {
        let response = {
            error: false,
            code: 200,
            data: productList,
        };

        res.status(response.code).send(response);;
    });

module.exports = router
