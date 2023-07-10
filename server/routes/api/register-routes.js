const router = require('express').Router();

const { Startup, Investor } = require("../../models")

// everything here is under "/api/register"

router.post("/", async (req, res) => {

    /*
            req.body should look like this:

            {
                "type": // either "startup" or "investor",
                "companyName": "",
                "email": "",
                "phoneNum": "",
                "userName": "",
                "password": ""
            }

    */

    const { companyName, email, phoneNum, userName, password } = req.body;

    if (req.body.type == "startup") {
        const result = await Startup.create({
            companyName, email, phoneNum, userName, password
        })

        res.json(result);
    } else if (req.body.type == "investor") {
        const result = await Investor.create({
            companyName, email, phoneNum, userName, password
        })

        res.json(result);
    }

})



module.exports = router;