
module.exports = function (extend, config, client) {

  var api = {}

  Object.keys(config.verbs).forEach(function (verb) {
    api[verb] = function (verb) {

    }.bind(api)
  })

  return api
}
