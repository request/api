
var t = require('assert')
var http = require('http')
var client = require('@request/client')
var api = require('../')


describe('init', () => {
  it('method', () => {
    var config = {
      method: {get: []}
    }
    var request = api(config)
    t.equal(typeof request.get, 'function')
  })
  it('method chaining', () => {
    var config = {
      method: {get: [], post: []}
    }
    var request = api(config)
    var result = request.get().post()
    t.equal(typeof result.get, 'function')
  })
  it('chain custom', () => {
    var config = {
      custom: {check: [], submit: []}
    }
    var custom = {
      check: function (options) {
        options.url = 'http://localhost:6767'
        return this
      },
      submit: function (options) {
        t.deepEqual(options, {url: 'http://localhost:6767'})
      }
    }
    var request = api(config, custom)
    request.check().submit()
  })
  it('HTTP method', () => {
    var config = {
      method: {get: []},
      custom: {submit: []}
    }
    var custom = {
      submit: function (options) {
        t.deepEqual(options, {method: 'GET', url: ''})
      }
    }
    var request = api(config, custom)
    request.get().submit()
  })
  it('option method', () => {
    var config = {
      option: {qs: []},
      custom: {submit: []}
    }
    var custom = {
      submit: function (options) {
        t.deepEqual(options, {qs: {a: 'b'}})
      }
    }
    var request = api(config, custom)
    request.qs({a: 'b'}).submit()
  })
  it('multiple instances', () => {
    var config = {
      option: {qs: [], form: []},
      custom: {submit: []}
    }
    var custom = {
      submit: function (options) {
        return options
      }
    }

    var a = api(config, custom).qs({a: 1})
    var b = api(config, custom).qs({b: 2})
    a.form({c: 3})

    t.deepEqual(a.submit(), {qs: {a: 1}, form: {c: 3}})
    t.deepEqual(b.submit(), {qs: {b: 2}})
  })
})

describe('request', () => {
  var server

  before((done) => {
    server = http.createServer()
    server.on('request', (req, res) => {
      res.writeHead(200, {'content-type': 'application/json'})
      res.end(req.url)
    })
    server.listen(6767, done)
  })

  it('get', (done) => {
    var config = {
      method: {get: []},
      option: {qs: [], callback: []},
      custom: {submit: []}
    }
    var custom = {
      submit: (options) => {
        return client(options)
      }
    }

    var request = api(config, custom)

    request
      .get('http://localhost:6767')
      .qs({a: 'b'})
      .callback((err, res, body) => {
        t.equal(body, '/?a=b')
        done()
      })
      .submit()
  })

  after((done) => {
    server.close(done)
  })
})

describe('aliases', () => {
  it('init', () => {
    var config = {
      method: {get: ['select']},
      option: {qs: ['where'], callback: ['done']},
      custom: {submit: ['gimme']}
    }
    var custom = {
      submit: (options) => {
        t.deepEqual(options, {
          method: 'GET', url: '',
          qs: {a: 'b'},
          callback: 'func'
        })
      }
    }
    var request = api(config, custom)
    request
      .select()
      .where({a: 'b'})
      .done('func')
      .gimme()
  })
})

describe('module', () => {

  function _module () {
    var config = {
      method: {get: ['select']},
      option: {qs: ['where'], callback: ['done']},
      custom: {check: [], submit: ['gimme']}
    }
    var custom = {
      check: function (options, host) {
        if (/localhost/.test(host)) {
          options.url += ':6767'
        }
        return this
      },
      submit: function (options) {
        return client(options)
      }
    }

    return api(config, custom)
  }

  before((done) => {
    server = http.createServer()
    server.on('request', (req, res) => {
      res.writeHead(200, {'content-type': 'application/json'})
      res.end(req.url)
    })
    server.listen(6767, done)
  })

  it('request', (done) => {
    var request = _module()
    request
      .select('http://localhost')
      .check('localhost')
      .where({a: 'b'})
      .done((err, res, body) => {
        t.equal(body, '/?a=b')
        done()
      })
      .gimme()
  })

  after((done) => {
    server.close(done)
  })
})
