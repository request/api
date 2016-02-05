
var http = require('http')
var should = require('should')
var extend = require('extend')
var client = require('@request/client')
var init = require('../')
var api = require('../config/api')


describe('init', () => {
  it('function', () => {
    var request = init(extend, api, () => {})
    should.equal(typeof request.get, 'function')
  })
  it('function chaining', () => {
    var request = init(extend, api, () => {})
    var result = request.get().post()
    should.equal(typeof result.get, 'function')
  })
  it('request options', () => {
    function submit () {
      should.deepEqual(this, {method: 'GET', url: ''})
    }
    var request = init(extend, api, submit)
    request.get().submit()
  })
  it('options method', () => {
    function submit () {
      should.deepEqual(this, {qs: {a: 'b'}})
    }
    var request = init(extend, api, submit)
    request.qs({a: 'b'}).submit()
  })
})

describe('request', function () {
  var server

  before(function (done) {
    server = http.createServer()
    server.on('request', function (req, res) {
      res.writeHead(200, {'content-type': 'application/json'})
      res.end(req.url)
    })
    server.listen(6767, done)
  })

  it('get', function (done) {
    function submit () {
      return client(this)
    }

    var request = init(extend, api, submit)

    request
      .get('http://localhost:6767')
      .qs({a: 'b'})
      .callback(function (err, res, body) {
        should.equal(body, '/?a=b')
        done()
      })
      .submit()
  })

  after(function (done) {
    server.close(done)
  })
})
