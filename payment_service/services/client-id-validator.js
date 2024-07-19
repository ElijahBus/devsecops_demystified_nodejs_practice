const crypto = require('crypto')

class ClientIdValidator {
    // Client id supposed stored in the DB
    clientID = "coffee_shop_id"

    getClientId() {
        return this.clientID
    }

    getHashedClientId() {
        return crypto.createHmac('sha512', this.clientID)
            .update(this.clientID)
            .digest('binary')
    }

    validate(incomingClientId) {
        console.log('hashed client id -', this.getHashedClientId())
        return this.getHashedClientId() === incomingClientId;
    }
}

module.exports = ClientIdValidator;
