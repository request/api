
module.exports = (extend, config, submit) => {

  return ((options) => {
    var api = {}

    Object.keys(config.verb).forEach((key) => {
      api[key] = ((key) => {
        return (url) => {
          options.method = key.toUpperCase()
          options.url = url || ''
          return api
        }
      })(key)
    })

    Object.keys(config.object).forEach((key) => {
      api[key] = ((key) => {
        return (value) => {
          var obj = {}
          obj[key] = value
          extend(options, obj)
          return api
        }
      })(key)
    })

    Object.keys(config.value).forEach((key) => {
      api[key] = ((key) => {
        return (value) => {
          options[key] = value
          return api
        }
      })(key)
    })

    api.submit = submit.bind(options)

    return api
  })({})
}
