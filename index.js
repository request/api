
module.exports = (config, custom) => ((options) => {
  var api = {}

  function wrapMethod (key) {
    return (url) => {
      options.method = key.toUpperCase()
      options.url = url || ''
      return api
    }
  }

  Object.keys(config.method || {}).forEach((key) => {
    api[key] = wrapMethod(key)

    config.method[key].forEach((alias) => {
      api[alias] = wrapMethod(key)
    })
  })

  function wrapOption (key) {
    return (value) => {
      options[key] = value
      return api
    }
  }

  Object.keys(config.option || {}).forEach((key) => {
    api[key] = wrapOption(key)

    config.option[key].forEach((alias) => {
      api[alias] = wrapOption(key)
    })
  })

  function wrapCustom (key) {
    return custom[key].bind(api, options)
  }

  Object.keys(config.custom || {}).forEach((key) => {
    api[key] = wrapCustom(key)

    config.custom[key].forEach((alias) => {
      api[alias] = wrapCustom(key)
    })
  })

  return api
})({})
