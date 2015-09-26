var winston = require('winston');
require('winston-loggly');
var Promise = require('bluebird');

// Replace these with your Loggly credentials
var LogglyEnv = {
    tags: process.env.LOGGLY_TAGS,
    token: process.env.LOGGLY_TOKEN,
    subdomain: process.env.LOGGLY_SUBDOMAIN
}

var loglevel = ['info', 'warning', 'error', 'fatal', 'debug', 'trace'];

/***
 * function Log(LogglyData)
 * 
 * LogglyData: string 
 * The name of the function you are logging from. This will be added as a tag.
 * 
 * LogglyData: Object
 *  { 
 *      token: string,
 *      subdomain: string,
 *      tags: array of string || string
 * }
 */
module.exports.Log = function(LogglyData) {
    var tags = [],
        envTags = [],
        dataTags = [];
    if ('string' == typeof LogglyData) { LogglyData = {tags: [LogglyData]}; }
    if (LogglyEnv.tags) { envTags = LogglyEnv.tags; }
    if ('string' == typeof envTags) { envTags = [envTags] };
    if (LogglyData.tags) { dataTags = LogglyData.tags; }
    if ('string' == typeof dataTags) { envTags = [dataTags] };   
     
    tags = envTags.concat(dataTags);
    var Loggly = {
        token: LogglyData.token || LogglyEnv.token,
        subdomain: LogglyData.subdomain || LogglyEnv.subdomain,
        tags: tags
    }
    console.log(Loggly);
    winston.add(winston.transports.Loggly, {
        token: Loggly.token,
        subdomain: Loggly.subdomain,
        tags: Loggly.tags,
        json:true
    });

    var PromisifiedLog = Promise.promisify(winston.log);

    return PromisifiedLog;
}

