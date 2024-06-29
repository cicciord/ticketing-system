const express = require("express");
const router = express.Router();

const jwtApi = require("../api/jwt-api");

const { isLoggedIn } = require("../middleware/auth");

router.get("/", isLoggedIn, jwtApi.getToken);

module.exports = router;
