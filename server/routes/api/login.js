const router = require('express').Router();

const { Startup, Investor } = require("../../models")

// everything here is under "/api/register"

router.post("/", async ({ body }, res) => {

    if (req.body.type == "startup") {
        const user = await Startup.findOne({ $or: [{ userName: body.userName }, { email: body.email }] });
        if (!user) {
            return res.status(400).json({ message: "Can't find this user" });
        }
    
        const correctPw = await user.isCorrectPassword(body.password);
    
        if (!correctPw) {
            return res.status(400).json({ message: 'Wrong password!' });
        }
        const token = signToken(user);
        res.json({ token, user });
    
    } else if (req.body.type == "investor") {
        const user = await Investor.findOne({ $or: [{ userName: body.userName }, { email: body.email }] });
        if (!user) {
            return res.status(400).json({ message: "Can't find this user" });
        }
    
        const correctPw = await user.isCorrectPassword(body.password);
    
        if (!correctPw) {
            return res.status(400).json({ message: 'Wrong password!' });
        }
        const token = signToken(user);
        res.json({ token, user });
    
    }

   
})



module.exports = router;