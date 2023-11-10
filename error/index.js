

class Error {
    constructor(message) {
        this.message = message;
        this.status = 500;
    }
}

module.exports = Error;