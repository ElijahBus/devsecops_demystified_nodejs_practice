class PaymentsService {
    memoryStore = []


    sendMoney(paymentDetails) {
        this.memoryStore.push(paymentDetails);

        return paymentDetails;
    }

    listAllPayment() {
        return this.memoryStore;
    }

    confirmMoneyWasSent() {

    }

}

module.exports = PaymentsService;
