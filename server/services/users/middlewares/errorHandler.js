const errorHandler = async (err, req, res, next) => {
  let code = 500;
  let message = "Internal server error";
  console.log(err);

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    message = err.errors[0].message;
  } else if (err.name === "JsonWebTokenError") {
    code = 401;
    message = "Invalid token";
  } else if (err.name === "Login failed") {
    code = 401;
    message = "Invalid email or password";
  } else if (err.name === "Email cannot be empty") {
    code = 401;
    message = "Email cannot be empty";
  } else if (err.name === "Password cannot be empty") {
    code = 401;
    message = "Password cannot be empty";
  } else if (err.name === "Forbidden") {
    code = 403;
    message = "You have no access";
  } else if (err.name === "Not found") {
    code = 404;
    message = "Id or data not found";
  }
  res.status(code).json({
    message: message,
  });
};

module.exports = errorHandler;
