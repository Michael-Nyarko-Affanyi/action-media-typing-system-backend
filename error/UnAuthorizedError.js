const Error = require('./Error.js');
class UnAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.status = 401;
  }
}

module.exports = UnAuthorizedError;