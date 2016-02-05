
var http = require('http')
var should = require('should')
var extend = require('extend')
var qs = require('qs')
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
