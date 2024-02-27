function errorHandler(err, req, res, next) {
  let status = 500;
  let message = "Internal Server Error";
  console.log(err, "ini error");

  if (err.name === "SequelizeValidationError") {
    status = 400;
    message = err.errors[0].message;
  } else if (err.name === "not_found") {
    status = 404;
    message = "Not Found";
  } else if (err.name === "JsonWebTokenError") {
    status = 401;
    message = "Invalid Token";
  } else if (err.name === "forbidden") {
    status = 403;
    message = "forbidden";
  }
  // login register
  else if (err.name === "Required") {
    status = 400;
    message = "password or email required";
  } else if (err.name === "wrong_auth") {
    status = 401;
    message = "Email or pass incorrect";
  } else if (err.name === "SequelizeUniqueConstraintError") {
    status = 400;
    message = "Email Already Exist";
  }
  // google login
  else if (err.name == "NoGoogleToken") {
    status = 400;
    message = "No Google Token Provided";
  }

  // midtrans
  else if (err.name == "InvalidDuration") {
    status = 400;
    message = "Invalid duration";
  } else if (err.name == "AlreadyRented") {
    status = 400;
    message = "You already rented this anime";
  } else if (err.name == "InvalidType") {
    status = 400;
    message = "Invalid type";
  } else if (
    err.name == "FraudStatusFalse" ||
    err.name == "PaymentOrderNotFound"
  ) {
    status = 400;
    message = "Payment Failed";
  }

  res.status(status).json({ message });
}

module.exports = errorHandler;
