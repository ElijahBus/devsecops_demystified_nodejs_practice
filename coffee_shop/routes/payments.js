const express = require('express')

const router = express.Router();

const axios = require('axios')
const crypto = require('crypto')

const clientId = "coffee_shop_id";

const hashedClientId = crypto.createHmac('sha512', clientId)
    .update(clientId)
    .digest('hex');


router.get('/list-payments', (req, res) => {

    axios.get('http://localhost:3000/api/v1/payment-service/list-all', {
        headers: {"x-client-id": hashedClientId}
    })
        .then(response => {
            res.status(200).json(response.data)
        })
        .catch(err => {
            res.status(400).send(err.message)
        })


})

router.post('/make-payment', (req, res) => {
    axios.post('http://localhost:3000/api/v1/payment-service/send-money', req.body, {
        headers: {"x-client-id": hashedClientId}
    })
        .then(response => {
            res.status(200).json(response.data)
        })
        .catch((err) => {
            res.status(400).send(err.message)
        })
})

router.post('confirm-payment', (req, res) => {

})

module.exports = router;
