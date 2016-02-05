
module.exports = (extend, config, submit) => {

  var api = {}
  var options = {}

  Object.keys(config.verbs).forEach((verb) => {
    api[verb] = ((verb) => {
      return (url) => {
        options.method = verb.toUpperCase()
        return api
      }
    })(verb)
  })

  api.submit = submit.bind(options)

  return api
}
