
class UnAuthorized extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.status = 401;
  }
}

module.exports = UnAuthorized;