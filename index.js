
module.exports = function (extend, config, client) {

  var api = {}

  Object.keys(config.verbs).forEach(function (verb) {
    api[verb] = function (verb) {
      return api
    }
  })

  return api
}
