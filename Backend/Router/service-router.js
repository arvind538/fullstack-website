const express = require("express");
const router = express.Router();
const getService = require("../Controllers/service-controller");

router.route("/service").get(getService);

module.exports = router;
