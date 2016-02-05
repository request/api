
var http = require('http')
var should = require('should')
var extend = require('extend')
var qs = require('qs')
var client = require('@request/client')
var init = require('../')
var api = require('../config/api')


describe('init', function () {
  it('api', function () {
    var request = init(extend, api, client)
    should.equal(typeof request.get, 'function')
  })
})
