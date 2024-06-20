const express = require("express");
const router = express.Router();

const userApi = require("../api/user-api");

router.post("/", userApi.login);
router.get("/current", userApi.getSession);
router.delete("/current", userApi.logout);

module.exports = router;
