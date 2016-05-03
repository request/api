
var t = require('assert')
var http = require('http')
var client = require('@request/client')
var api = require('../')


describe('request', () => {
  var server

  before((done) => {
    server = http.createServer()
    server.on('request', (req, res) => {
      res.writeHead(202)
      res.end(req.url)
    })
    server.listen(6767, done)
  })

  it('basic', (done) => {
    var request = api({
      type: 'basic',
      define: {
        request: client
      }
    })

    request('http://localhost:6767', {qs: {a: 1}}, (err, res, body) => {
      t.equal(err, null)
      t.equal(res.statusCode, 202)
      t.equal(body, '/?a=1')
      done()
    })
  })

  it('chain', (done) => {
    var request = api({
      type: 'chain',
      define: {
        request: function () {
          return client(this._options)
        }
      }
    })

    request
      .get('http://localhost:6767')
      .qs({a: 1})
      .callback((err, res, body) => {
        t.equal(err, null)
        t.equal(res.statusCode, 202)
        t.equal(body, '/?a=1')
        done()
      })
      .request()
  })

  after((done) => {
    server.close(done)
  })
})
