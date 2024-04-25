import express from "express";
import requireLogin from "../middlewares/requireLogin";
import data from "../data/data";

const router = express.Router();

router.route("/").get(requireLogin, function (req, res) {
  let response = {
    error: false,
    code: 200,
    data: data.getClients(),
  };

  res.status(response.code).send(response);;
});

module.exports = router;
