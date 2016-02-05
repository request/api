
var http = require('http')
var should = require('should')
var extend = require('extend')
var client = require('@request/client')
var init = require('../')
var config = require('../config/api')


describe('init', () => {
  it('function', () => {
    var request = init(extend, config, () => {})
    should.equal(typeof request.get, 'function')
  })
  it('function chaining', () => {
    var request = init(extend, config, () => {})
    var result = request.get().post()
    should.equal(typeof result.get, 'function')
  })
  it('request options', () => {
    function submit () {
      should.deepEqual(this, {method: 'GET', url: ''})
    }
    var request = init(extend, config, submit)
    request.get().submit()
  })
  it('object method', () => {
    function submit () {
      should.deepEqual(this, {qs: {a: 'b'}})
    }
    var request = init(extend, config, submit)
    request.qs({a: 'b'}).submit()
  })
  it('multiple calls', () => {
    function submit (obj) {
      should.deepEqual(this, {qs: obj})
    }
    var request = init(extend, config, submit)
    request.qs({a: 'b'}).submit.call(null, {a: 'b'})
    request.qs({c: 'd'}).submit.call(null, {c: 'd'})
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
    function submit () {
      return client(this)
    }

    var request = init(extend, config, submit)

    request
      .get('http://localhost:6767')
      .qs({a: 'b'})
      .callback((err, res, body) => {
        should.equal(body, '/?a=b')
        done()
      })
      .submit()
  })

  after((done) => {
    server.close(done)
  })
})
