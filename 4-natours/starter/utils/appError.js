export class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // Call the parent constructor with the message

    this.statusCode = statusCode; // Set the status code
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; // Determine if the status is a client error (4xx) or server error (5xx)
    this.isOperational = true; // Mark the error as operational

    Error.captureStackTrace(this, this.constructor); // Capture the stack trace for debugging
  }
}
