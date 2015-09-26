# awsm-loggly
JAWS awsm module to provide logging to your lambdas.

Application code running in the cloud can be challenging to debug. 
Loggly is a cloud-based logging service that allows you to search and filter log data. 
Logging to Loggly from your lambdas allows you to trace application execution across multiple lambdas, and debug your application flow.

To use:

In your JAWS project root directory, run:
```
jaws module install https://github.com/jwulf/awsm-loggly
```
 
 You can specify your Loggly details in your lambda code:
 
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
 If you put the credentials in the `.env` file, you can instantiate the logger like this:
 ```
 var log = require('./../../loggly').Log({tags: [thisFunctionName]);
 ```
 
 The tags will be added to any tags that you defined in `.env`. Typically you'll want to push the name of your Lambda function, so that you can filter for it in your logs.
 
 ```
 log('trace', 'Processing a new order', {ordernum: order.number, customer: order.customerId}).then(
	 function() {
		 \\ Execution continues here
});
 ```
 
