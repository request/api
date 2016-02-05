
module.exports = function (extend, config, submit) {

  var api = {}
  var options = {}

  Object.keys(config.verbs).forEach(function (verb) {
    api[verb] = function (verb) {
      return api
    }
  })

  api.submit = submit.bind(options)

  return api
}
