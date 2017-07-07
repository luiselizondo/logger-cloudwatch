/*eslint no-console: "off"*/

var winston = require('winston');
var CloudWatchTransport = require('winston-aws-cloudwatch')
var environment = process.env.NODE_ENV;
var debug = process.env.DEBUG;

winston.remove('console');

var ConsoleLogger = winston.transports.Console;
var ConsoleOptions = {
  handleExceptions: true,
  json: false,
  colorize: true,
  prettyPrint: false,
  stringify: false,
  humanReadableUnhandledException: true
};

// TODO: Move to config
// Test performance
var CloudWatchTransportOptions = {
  logGroupName: '',
  logStreamName: '',
  awsConfig: {
    accessKeyId: '',
    secretAccessKey: '',
    region: ''
  }
}

if(environment !== ('dev' || 'test')) {
  winston.add(CloudWatchTransport, CloudWatchTransportOptions);
}

if(environment === 'test') {
  if (debug == "true" || debug == true) {
    ConsoleOptions.level = 'warn';
    ConsoleOptions.json = false;
    ConsoleOptions.prettyPrint = false;
    winston.add(ConsoleLogger, ConsoleOptions);
  }
}

if(environment === 'dev') {
  ConsoleOptions.level = 'info';
  winston.add(ConsoleLogger, ConsoleOptions);
}

function Logger() {

}

Logger.prototype.setProcess = function (processName) {
	this.processName = processName
}

Logger.prototype.i = function(message, opts) {
	if (!this.processName) {
		throw new Error('No process name set on logger')
	}

	var data = opts || {}
	data.process = this.processName
	winston.info(message, opts)
}

Logger.prototype.l = function(message, opts) {
  return this.i(message, opts)
}

Logger.prototype.log = function(message, opts) {
  return this.i(message, opts)
}

Logger.prototype.info = function(message, opts) {
  return this.i(message, opts)
}

Logger.prototype.e = function(message, opts) {
	if (!this.processName) {
		throw new Error('No process name set on logger')
	}

	var data = opts || {}
	data.process = this.processName
	winston.error(message, opts)
}

Logger.prototype.error = function(message, opts) {
  return this.e(message, opts)
}

Logger.prototype.w = function(message, opts) {
	if (!this.processName) {
		throw new Error('No process name set on logger')
	}

	var data = opts || {}
	data.process = this.processName
	winston.warning(message, opts)
}

Logger.prototype.warn = function(message, opts) {
  return this.w(message, opts)
}

Logger.prototype.warning = function(message, opts) {
  return this.w(message, opts)
}

Logger.prototype.test = function(message, opts) {
  if(opts) {
    console.log(message, opts);
  }
  else {
    console.log(message);
  }

  return;
};

module.exports = new Logger();
