const { LogicalException } = require('@adonisjs/generic-exceptions');

class NoAccessException extends LogicalException {
  handle({ response }) {
    response.status(403).json({ message: 'Access denied' });
  }
}

module.exports = NoAccessException;
