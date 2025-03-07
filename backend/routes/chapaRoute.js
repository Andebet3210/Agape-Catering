import express, { response } from 'express';
import axios from 'axios';
import dotenv from "dotenv";
// Load environment variables
dotenv.config();

const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;

const chapa = express.Router();

chapa.post('/pay', async (req, res) => {
    console.log(CHAPA_SECRET_KEY);

    try {
        const { amount, currency, email, first_name, last_name, phone, tx_ref, callback_url } = req.body;

        // Validate input
        if (!amount || !phone) {
            return res
                .status(400)
                .json({ success: false, message: 'All fields are required' });
        }

        // Payment logic goes here
        // payment data

        const paymentData = {
            amount,
            currency,
            email,
            first_name,
            last_name,
            phone,
            tx_ref,
            callback_url,
            return_url: 'http://localhost:3000/success',
            // cancel_url: 'http://localhost:3000/cancel',
        }
        const response = await axios.post('https://api.chapa.co/v1/transaction/initialize', paymentData, {
            headers: {
                Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
                'Content-Type': 'application/json'
            }
        });



        res.json({ success: true, message: 'Payment successful', data: response.data });
    } catch (error) {
        console.error("Error processing payment:", error.response?.data || error.message);
        res.status(500).json({
            success: false,
            message: "Payment failed",
            error: error.response?.data || error.message
        });
    }
});

chapa.post('/verify', async (req, res) => {
    console.log("Webhook received: ", req.body);
    res.status(200).send("Webhook received");
});
export default chapa;
