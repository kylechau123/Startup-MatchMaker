const router = require('express').Router();
const registerRoutes = require("./register-routes")

// everything here is under "/api"

router.use("/register", registerRoutes)


module.exports = router;