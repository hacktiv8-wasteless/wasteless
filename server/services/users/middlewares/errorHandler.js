const errorHandler = (error, req, res, next) => {
  console.log(error);
  let code;
  let message;

  switch (error.name) {
    case `SequelizeValidationError`:
    case `SequelizeUniqueConstraintError`:
      code = 400;
      message = error.errors.map((el) => el.message);
      break;
    case `BAD_TRANSACTION_REQUEST`:
    case `BAD_PATCH_REQUEST`:
      code = 400;
      message = error.message;
      break;
    case `JsonWebTokenError`:
    // case `Unauthorized`:
    //   code = 401;
    //   message = "Invalid token";
    //   break;
    // case `INVALID_CREDENTIALS`:
    //   code = 401;
    //   message = "Invalid Email or password!";
    //   break;
    // case `FORBIDDEN`:
    //   code = 403;
    //   message = "Invalid access!";
    //   break;
    // case `USER_NOT_FOUND`:
    //   code = 404;
    //   message = `Users with id ${err.id} not Found!`;
    //   break;

    default:
      code = 500;
      message = "Internal Server Error!";
      break;
  }
  res.status(code).json({ message });
};

module.exports = errorHandler;
