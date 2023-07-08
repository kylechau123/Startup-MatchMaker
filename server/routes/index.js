const router = require('express').Router();

const apiRoutes = require("./api")

// router.get("/test", (req, res) => {
//     res.send("Hello world")
// })

router.use("/api", apiRoutes)


module.exports = router;