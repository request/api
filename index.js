
var basic = require('./lib/basic')
var chain = require('./lib/chain')
var config = require('./config/methods')


module.exports = (options) => {
  if (options.type === 'basic') {
    return basic(options.config || config, options.request)
  }
  else if (options.type === 'chain') {
    return chain(options.config, options.define)
  }
}
