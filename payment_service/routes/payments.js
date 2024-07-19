const express = require('express')

const router = express.Router()

const PaymentService = require('../services/payment-service')
const PaymentServiceInstance = new PaymentService();

router.get('/list-all', (req, res) => {
    const allPayments = PaymentServiceInstance.listAllPayment();

    res.status(200).json(allPayments);
})

router.post('/send-money', (req, res) => {
    res.send("OK");
    /// {client_name: string, amount: number, profile_picture: string}

    const lastTransaction = PaymentServiceInstance.sendMoney(req.body);

    res.status(200).json(lastTransaction);
})

router.post('/confirm-money-sent', (req, res) => {

})

module.exports = router;
