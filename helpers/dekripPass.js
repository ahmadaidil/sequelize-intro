const crypto = require("crypto");

module.exports = function dekripPass(salt, password) {
  var realpass = crypto.createHmac('sha256', salt).update(password).digest('hex');
  return realpass;
}
