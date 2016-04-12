
function API (config, custom) {
  this.options = {}

  var api = {}

  var wrap = {
    method: (key) => ((url) => {
      this.options.method = key.toUpperCase()
      this.options.url = url || ''
      return api
    }),
    option: (key) => ((value) => {
      this.options[key] = value
      return api
    }),
    custom: (key) => custom[key].bind(api, this.options)
  }

  Object.keys(config).forEach((type) => {
    Object.keys(config[type]).forEach((method) => {
      api[method] = wrap[type](method)

      config[type][method].forEach((alias) => {
        api[alias] = wrap[type](method)
      })
    })
  })

  return api
}

module.exports = (config, custom) => {
  return new API(config, custom)
}
