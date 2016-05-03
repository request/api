
var t = require('assert')
var api = require('../')


describe('chain', () => {
  it('method types and chaining', () => {
    var request = api({
      type: 'chain',
      config: {
        method: {get: []},
        option: {qs: []},
        custom: {request: []}
      },
      define: {
        request: function () {
          return this._options
        }
      }
    })
    t.deepEqual(
      request.get('u').qs({a: 1}).request(),
      {method: 'GET', url: 'u', qs: {a: 1}}
    )
  })
  it('chain custom methods', () => {
    var request = api({
      type: 'chain',
      config: {
        custom: {set: [], request: []}
      },
      define: {
        set: function () {
          this._options.a = 1
          return this
        },
        request: function () {
          return this._options
        }
      }
    })
    t.deepEqual(request.set().request(), {a: 1})
  })
  it('create new instance on first call through any method type', () => {
    var request = api({
      type: 'chain',
      config: {
        method: {get: []},
        option: {qs: []},
        custom: {request: []}
      },
      define: {
        request: function () {
          return this._options
        }
      }
    })
    t.deepEqual(request.get('u').request(), {method: 'GET', url: 'u'})
    t.deepEqual(request.qs({a: 1}).request(), {qs: {a: 1}})
    t.deepEqual(request.request(), {})
  })
  it('multiple instances', () => {
    var request = api({
      type: 'chain',
      config: {
        method: {get: []},
        option: {qs: [], form: []},
        custom: {request: []}
      },
      define: {
        request: function () {
          return this._options
        }
      }
    })

    var a = request.get('a').qs({a: 1})
    var b = request.get('b').qs({b: 2})
    a.form({c: 3})

    t.deepEqual(a.request(), {method: 'GET', url: 'a', qs: {a: 1}, form: {c: 3}})
    t.deepEqual(b.request(), {method: 'GET', url: 'b', qs: {b: 2}})
  })
  it('pass custom method arguments', () => {
    var request = api({
      type: 'chain',
      config: {
        custom: {request: []}
      },
      define: {
        request: function (err, res, body) {
          t.equal(err, null)
          t.deepEqual(res, {status: 200})
          t.equal(body, 'ok')
        }
      }
    })
    request.request(null, {status: 200}, 'ok')
  })
  it('aliases', () => {
    var request = api({
      type: 'chain',
      config: {
        method: {get: ['select']},
        option: {qs: ['where']},
        custom: {request: ['gimme']}
      },
      define: {
        request: function () {
          return this._options
        }
      }
    })
    t.deepEqual(
      request.select('u').where({a: 1}).gimme(),
      {method: 'GET', url: 'u', qs: {a: 1}})
  })
  it('default interface', () => {
    var request = api({
      type: 'chain',
      define: {
        request: function () {
          return this._options
        }
      }
    })
    t.deepEqual(
      request.get('u').qs({a: 1}).request(),
      {method: 'GET', url: 'u', qs: {a: 1}})
  })
})
