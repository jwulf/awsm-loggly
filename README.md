# awsm-loggly
JAWS awsm module to provide logging to your lambdas.

Application code running in the cloud can be challenging to debug. 
[Loggly] [https://www.loggly.com] is a cloud-based logging service that allows you to search and filter log data. 
Logging to Loggly from your lambdas allows you to trace application execution across multiple lambdas, and debug your application flow.

To use:

In your JAWS project root directory, run:
```
jaws module install https://github.com/jwulf/awsm-loggly
```
 
 You can specify your Loggly credentials in your lambda code:
 
 ```
 var logglyCredentials = {
	token: _LOGGLY_TOKEN_,
	subdomain: _LOGGLY_SUBDOMAIN_,
	tags: [_LOGGLY_TAGS_]	 
}
	 
 var log = require('./../../loggly').Log(logglyCredentials);
 ```
 
 or you can specify them in `.env`:
 
```
LOGGLY_TOKEN="_TOKEN_"
LOGGLY_SUBDOMAIN="_SUBDOMAIN_"
LOGGLY_TAGS="some tag"
 ```
 If you put the credentials in the `.env` file, you can add additional tags with the constructor parameter.
 
 With your Loggly credentials in `.env`, you can instantiate the logger like this:
 
 ```
 var log = require('./../../loggly').Log('thisFunctionName');
 ```
 
 The constructor parameter will be added to the tags. Typically you'll specify the name of your Lambda function, so that you can filter for it in your logs.
 
 And here is how you log something:
 
 ```
 var logLevel = 'trace',
 	msg = 'Processing a new order',
	metadata = {ordernum: order.number, customer: order.customerId};
 
 log(logLevel, msg, metadata).then(
	 function() {
		 \\ Execution continues here
});
 ```
 
 Valid logging levels are:
 
 ```['info', 'warning', 'error', 'fatal', 'debug', 'trace']```
 
 The logger uses bluebird promises to ensure that your log messages are sent.
