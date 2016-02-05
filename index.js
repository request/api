
module.exports = (extend, config, submit) => {

  var api = {}
  var options = {}

  Object.keys(config.verbs).forEach((verb) => {
    api[verb] = ((verb) => {
      return (url) => {
        options.method = verb.toUpperCase()
        options.url = url || ''
        return api
      }
    })(verb)
  })

  Object.keys(config.options).forEach((option) => {
    api[option] = ((option) => {
      return (value) => {
        var obj = {}
        obj[option] = value
        extend(options, obj)
        return api
      }
    })(option)
  })

  api.submit = submit.bind(options)

  return api
}
