
var t = require('assert')
var api = require('../')


describe('init', () => {
  it('method types and chaining', () => {
    var config = {
      method: {get: []},
      option: {qs: []},
      custom: {submit: []}
    }
    var custom = {
      submit: function () {
        return this._options
      }
    }
    var request = api(config, custom)
    t.deepEqual(
      request.get('a').qs({a: 'b'}).submit(),
      {method: 'GET', url: 'a', qs: {a: 'b'}}
    )
  })
  it('chain custom methods', () => {
    var config = {
      custom: {set: [], submit: []}
    }
    var custom = {
      set: function () {
        this._options.a = 1
        return this
      },
      submit: function () {
        return this._options
      }
    }
    var request = api(config, custom)
    t.deepEqual(request.set().submit(), {a: 1})
  })
  it('create new instance on first call through any method type', () => {
    var config = {
      method: {get: []},
      option: {qs: []},
      custom: {submit: []}
    }
    var custom = {
      submit: function () {
        return this._options
      }
    }

    var request = api(config, custom)

    t.deepEqual(request.get('a').submit(), {method: 'GET', url: 'a'})
    t.deepEqual(request.qs({a: 1}).submit(), {qs: {a: 1}})
    t.deepEqual(request.submit(), {})
  })
  it('multiple instances', () => {
    var config = {
      method: {get: []},
      option: {qs: [], form: []},
      custom: {submit: []}
    }
    var custom = {
      submit: function () {
        return this._options
      }
    }

    var request = api(config, custom)

    var a = request.get('a').qs({a: 1})
    var b = request.get('b').qs({b: 2})
    a.form({c: 3})

    t.deepEqual(a.submit(), {method: 'GET', url: 'a', qs: {a: 1}, form: {c: 3}})
    t.deepEqual(b.submit(), {method: 'GET', url: 'b', qs: {b: 2}})
  })
  it('pass custom method arguments', () => {
    var config = {
      custom: {submit: []}
    }
    var custom = {
      submit: function (err, res, body) {
        t.equal(err, null)
        t.deepEqual(res, {status: 200})
        t.equal(body, 'ok')
      }
    }
    var request = api(config, custom)
    request.submit(null, {status: 200}, 'ok')
  })
  it('aliases', () => {
    var config = {
      method: {get: ['select']},
      option: {qs: ['where']},
      custom: {submit: ['gimme']}
    }
    var custom = {
      submit: function () {
        return this._options
      }
    }
    var request = api(config, custom)
    t.deepEqual(
      request.select('a').where({a: 1}).gimme(),
      {method: 'GET', url: 'a', qs: {a: 1}})
  })
})
