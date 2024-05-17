const crypto = require('crypto')

const secretkey = crypto.randomBytes(32).toString('hex')

module.exports = {
    secretkey: secretkey
};