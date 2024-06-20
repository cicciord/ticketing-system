const express = require("express");
const router = express.Router();

const jwtApi = require("../api/jwt-api");

router.get("/", jwtApi.getToken);

module.exports = router;
