/**
 * Response Handler
 * Standardize all API responses
 */

const sendResponse = (res, statusCode, success, message, data = null) => {
  const response = {
    success,
    message
  };

  if (data) {
    response.data = data;
  }

  res.status(statusCode).json(response);
};

const sendSuccess = (res, message, data = null, statusCode = 200) => {
  sendResponse(res, statusCode, true, message, data);
};

const sendError = (res, message, statusCode = 500) => {
  sendResponse(res, statusCode, false, message);
};

module.exports = {
  sendResponse,
  sendSuccess,
  sendError
};