class ConflictError extends Error {
  constructor(message = 'Нельзя изменить почту другого пользователя') {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = { ConflictError };
