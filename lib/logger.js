/*eslint no-console: "off"*/

var winston = require('winston')
var environment = process.env.NODE_ENV

winston.remove(winston.transports.Console);
var ConsoleLogger = winston.transports.Console
var ConsoleOptions = {
  handleExceptions: true,
  json: false,
  colorize: true,
  prettyPrint: false,
  stringify: false,
  humanReadableUnhandledException: true
}

if (environment === 'test') {
  ConsoleOptions.level = 'error'
}
else {
  ConsoleOptions.level = 'info'
}

winston.add(ConsoleLogger, ConsoleOptions)

class Logger {
  contructor() {
    console.log('==================================')
  }

  setProcess(processName) {
    this.processName = processName
  }

  i(message, opts) {
    if (!this.processName) {
      throw new Error('No process name set on logger')
    }

    var data = Object.assign({}, opts)
    data.process = this.processName
    winston.log('info', message, opts)
  }

  l(message, opts) {
    return this.i(message, opts)
  }

  log(message, opts) {
    return this.i(message, opts)
  }

  info(message, opts) {
    return this.i(message, opts)
  }

  e(message, opts) {
    if (!this.processName) {
      throw new Error('No process name set on logger')
    }

    var data = Object.assign({}, opts)
    data.process = this.processName
    winston.error('error', message, opts)
  }

  error(message, opts) {
    return this.e(message, opts)
  }

  w(message, opts) {
    if (!this.processName) {
      throw new Error('No process name set on logger')
    }

    var data = Object.assign({}, opts)
    data.process = this.processName
    winston.warn('warn', message, opts)
  }

  warn(message, opts) {
    return this.w(message, opts)
  }

  warning(message, opts) {
    return this.w(message, opts)
  }

  test(message, opts) {
    if (opts) {
      console.log(message, opts)
    }
    else {
      console.log(message)
    }

    return
  }
}

module.exports = Logger
