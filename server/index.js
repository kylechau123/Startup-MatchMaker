import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/AuthRoute.js";
import userRoute from "./routes/UserRoute.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { getThread, saveMessage } from "./controllers/MessageController.js";
import { addInvestment, checkAmount } from "./controllers/InvestmentController.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

import { graphqlHTTP } from "express-graphql";
import schema from "./graphql/index.js";


dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use('/graphql', graphqlHTTP((req, res) => ({
    schema: schema,
    graphiql: true, // Enable GraphiQL for testing the API
    context: { req, res }
})));

app.use("/", authRoute);
app.use("/user", userRoute);
app.use('/uploads', express.static('uploads'));

const server = http.createServer(app);

// Socket for messaging
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', (msg) => {
        saveMessage(msg).then((data) => {
            io.emit('message', data);
        });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('init', (msg) => {
        getThread(msg).then((data) => {
            io.emit('init', data);
        });
    });
})

// handle payment
app.post("/payment", async (req, res) => {
    const { token, amount, startupId, investorId } = req.body;
    const check = await checkAmount(startupId, amount);
    if (!check) return res.status(400).json({ message: "Amount exceeds investment needed" });
    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });
        const payment = await stripe.charges.create({
            amount: amount * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email
        }, {
            idempotencyKey: Date.now()
        });
        if (payment) {
            await addInvestment(startupId, investorId, amount);
            res.status(200).json({ success: true, message: "Payment Successful" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
});


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));