var winston = require('winston');
require('winston-loggly');
var Promise = require('bluebird');

// Replace these with your Loggly values
Loggly = {
    token: process.env.LOGGLY_TOKEN,
    subdomain: process.env.LOGGLY_SUBDOMAIN,
    tags: [process.env.LOGGLY_TAGS]
}

 winston.add(winston.transports.Loggly, {
    token: Loggly.token,
    subdomain: Loggly.subdomain,
    tags: Loggly.tags,
    json:true
});

var log = Promise.promisify(winston.log);

function loginfo (msg, data, callback) {
   log('info', msg, data).then(callback);
}

module.exports.log = log;
module.exports.info = Promise.promisify(loginfo);

var loglevel = ['info', 'warning', 'error', 'fatal', 'debug', 'trace'];
