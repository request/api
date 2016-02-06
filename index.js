
module.exports = (config, submit) => {

  return ((options) => {
    var api = {}

    function wrapVerb (key) {
      return (url) => {
        options.method = key.toUpperCase()
        options.url = url || ''
        return api
      }
    }

    Object.keys(config.verb).forEach((key) => {
      api[key] = wrapVerb(key)

      config.verb[key].forEach((alias) => {
        api[alias] = wrapVerb(key)
      })
    })

    function wrapOption (key) {
      return (value) => {
        options[key] = value
        return api
      }
    }

    Object.keys(config.option).forEach((key) => {
      api[key] = wrapOption(key)

      config.option[key].forEach((alias) => {
        api[alias] = wrapOption(key)
      })
    })

    api.submit = submit.bind(options)

    config.custom.submit.forEach((alias) => {
      api[alias] = submit.bind(options)
    })

    return api
  })({})
}
