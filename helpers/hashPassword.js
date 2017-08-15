const crypto = require('crypto');

module.exports = function hashPassword(privateKey, password){
  let hash = crypto.createHmac('sha256', privateKey).update(password).digest('hex');
  return hash;
}

//module.exports = hashPassword;
