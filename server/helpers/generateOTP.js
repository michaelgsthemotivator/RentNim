const otpGenerator = require("otp-generator");

function generateOTP() {
  return otpGenerator.generate(32, {});
}

module.exports = { generateOTP };
