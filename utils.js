
var crypto = require('crypto');

var utils = {};

utils.getHash = function (password, salt) {

    var h = crypto.createHash('sha512');
    h.update(password);
    h.update(salt);
    return h.digest('base64');
}

utils.getSalt = function(){
    return crypto.randomBytes(128).toString('base64');
}

module.exports = utils;
