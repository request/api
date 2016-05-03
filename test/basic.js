
var t = require('assert')
var api = require('../')


describe('basic', () => {
  describe('request()', () => {
    it('request(url)', () => {
      var request = api({
        type: 'basic',
        define: {request: (options) => (options)}
      })
      t.deepEqual(
        request('u'),
        {url: 'u'}
      )
    })
    it('request(options)', () => {
      var request = api({
        type: 'basic',
        define: {request: (options) => (options)}
      })
      function callback () {}
      t.deepEqual(
        request({url: 'u', callback: callback}),
        {url: 'u', callback: callback}
      )
    })
    it('request(url, callback)', () => {
      var request = api({
        type: 'basic',
        define: {request: (options) => (options)}
      })
      function callback () {}
      t.deepEqual(
        request('u', callback),
        {url: 'u', callback: callback}
      )
    })
    it('request(options, callback)', () => {
      var request = api({
        type: 'basic',
        define: {request: (options) => (options)}
      })
      function callback () {}
      t.deepEqual(
        request({url: 'u'}, callback),
        {url: 'u', callback: callback}
      )
    })
    it('request(url, options, callback)', () => {
      var request = api({
        type: 'basic',
        define: {request: (options) => (options)}
      })
      function callback () {}
      t.deepEqual(
        request('u', {qs: {a: 1}}, callback),
        {url: 'u', qs: {a: 1}, callback: callback}
      )
    })
  })

  describe('request.verb()', () => {
    it('request.get(url)', () => {
      var request = api({
        type: 'basic',
        define: {request: (options) => (options)}
      })
      t.deepEqual(
        request.get('u'),
        {method: 'GET', url: 'u'}
      )
    })

    it('request.get(options)', () => {
      var request = api({
        type: 'basic',
        define: {request: (options) => (options)}
      })
      function callback () {}
      t.deepEqual(
        request.get({url: 'u', callback: callback}),
        {method: 'GET', url: 'u', callback: callback}
      )
    })
    it('request.get(url, callback)', () => {
      var request = api({
        type: 'basic',
        define: {request: (options) => (options)}
      })
      function callback () {}
      t.deepEqual(
        request.get('u', callback),
        {method: 'GET', url: 'u', callback: callback}
      )
    })
    it('request.get(options, callback)', () => {
      var request = api({
        type: 'basic',
        define: {request: (options) => (options)}
      })
      function callback () {}
      t.deepEqual(
        request.get({url: 'u'}, callback),
        {method: 'GET', url: 'u', callback: callback}
      )
    })
    it('request.get(url, options, callback)', () => {
      var request = api({
        type: 'basic',
        define: {request: (options) => (options)}
      })
      function callback () {}
      t.deepEqual(
        request.get('u', {qs: {a: 1}}, callback),
        {method: 'GET', url: 'u', qs: {a: 1}, callback: callback}
      )
    })
  })
})
