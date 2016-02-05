
module.exports = (extend, config, submit) => {

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

    function wrapObject (key) {
      return (value) => {
        var obj = {}
        obj[key] = value
        extend(options, obj)
        return api
      }
    }

    Object.keys(config.object).forEach((key) => {
      api[key] = wrapObject(key)

      config.object[key].forEach((alias) => {
        api[alias] = wrapObject(key)
      })
    })

    function wrapValue (key) {
      return (value) => {
        options[key] = value
        return api
      }
    }

    Object.keys(config.value).forEach((key) => {
      api[key] = wrapValue(key)

      config.value[key].forEach((alias) => {
        api[alias] = wrapValue(key)
      })
    })

    api.submit = submit.bind(options)

    config.custom.submit.forEach((alias) => {
      api[alias] = submit.bind(options)
    })

    return api
  })({})
}
