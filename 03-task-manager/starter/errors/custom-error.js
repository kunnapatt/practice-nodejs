class CustomAPIError extends Error {

    constructor(statusCode, msgErr) {
        super(msgErr)
        this.statusCode = statusCode
    }
}

const createCustomError = (statusCode, msgErr) => {
    return new CustomAPIError(statusCode, msgErr)
}

module.exports = { createCustomError, CustomAPIError }