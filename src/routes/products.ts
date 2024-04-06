import express from 'express'
import data from "../data/data";

const router = express.Router()

router
    .route("/")
    .get(function (req, res) {
        let response = {
            error: false,
            code: 200,
            data: data.getProducts(),
        };

        res.status(response.code).send(response);;
    });

module.exports = router
