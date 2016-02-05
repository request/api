
var http = require('http')
var should = require('should')
var extend = require('extend')
var qs = require('qs')
var client = require('@request/client')
var init = require('../')
var api = require('../config/api')


describe('init', function () {
  it('function', function () {
    function submit () {}
    var request = init(extend, api, submit)
    should.equal(typeof request.get, 'function')
  })
  it('chain', function () {
    function submit () {}
    var request = init(extend, api, submit)
    var result = request.get().post()
    should.equal(typeof result.get, 'function')
  })
  it('options', function () {
    function submit () {
      should.deepEqual(this, {method: 'GET'})
    }
    var request = init(extend, api, submit)
    var result = request.get().submit()
  })
})
