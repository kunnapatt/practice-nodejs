const CustomAPIError = require('./custom-error');
const BadRequest = require('./bad-requests');
const UnAuthenticatedError = require('./unauth');

module.exports = {
    CustomAPIError,
    BadRequest,
    UnAuthenticatedError
}