
module.exports = (config, custom) => {

  var wrap = {
    method: function (key) {
      return (value) => {
        if (!this._options) {
          var api = init()
          api._options = {}
          return api[key](value)
        }
        this._options.method = key.toUpperCase()
        this._options.url = value || ''
        return this
      }
    },
    option: function (key) {
      return (value) => {
        if (!this._options) {
          var api = init()
          api._options = {}
          return api[key](value)
        }
        this._options[key] = value
        return this
      }
    },
    custom: function (key) {
      return function () {
        if (!this._options) {
          var api = init()
          api._options = {}
          return custom[key].apply(api, arguments)
        }
        return custom[key].apply(this, arguments)
      }.bind(this)
    }
  }

  function init () {
    var api = {}

    Object.keys(config).forEach((type) => {
      Object.keys(config[type]).forEach((method) => {
        api[method] = wrap[type].call(api, method)

        config[type][method].forEach((alias) => {
          api[alias] = wrap[type].call(api, method)
        })
      })
    })

    return api
  }

  return init()
}
