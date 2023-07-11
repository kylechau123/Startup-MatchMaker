import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const userVerification = (req, res) => {
    const token = req.cookies.token
    if (!token) {
        return res.json({ status: false })
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            return res.json({ status: false })
        } else {
            const user = await User.findById(data.id)
            if (user) return res.json({ status: true, userdata: user.username, userEmail: user.email, userRole: user.role })
            else return res.json({ status: false })
        }
    })
}

const verifyAuth = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        res.status(401)
        return res.json({ status: "unauthorized" })
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            res.status(401)
            return res.json({ status: "unauthorized" })
        } else {
            const user = await User.findById(data.id)
            if (user) {
                res.locals.user = user
                next()
            }
            else {
                res.status(401)
                return res.json({ status: "unauthorized" })
            }
        }
    })
}

const verifyAuthGQ = (ctx) => {
    const { req, res } = ctx;
    const token = req.cookies.token
    if (!token) {
        return false;
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_KEY)
        if (verified) {
            return verified.id;
        }
    } catch (err) {
        return false;
    }
}

export { userVerification, verifyAuth, verifyAuthGQ }