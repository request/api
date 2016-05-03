
var t = require('assert')
var api = require('../')


describe('chain', () => {
  it('method types and chaining', () => {
    var request = api({
      type: 'chain',
      define: {
        request: (options) => (options)
      }
    })
    t.deepEqual(
      request.get('u').qs({a: 1}).request(),
      {method: 'GET', url: 'u', qs: {a: 1}}
    )
  })
  it('chain custom methods and pass arguments', () => {
    var request = api({
      type: 'chain',
      config: {
        custom: {set: []}
      },
      define: {
        set: (options, arg) => {
          options.a = arg
        },
        request: (options) => (options)
      }
    })
    t.deepEqual(request.set(1).request(), {a: 1})
  })
  it('create new instance on first call through any method type', () => {
    var request = api({
      type: 'chain',
      define: {
        request: (options) => (options)
      }
    })
    t.deepEqual(request.get('u').request(), {method: 'GET', url: 'u'})
    t.deepEqual(request.qs({a: 1}).request(), {qs: {a: 1}})
    t.deepEqual(request.request(), {})
  })
  it('multiple instances', () => {
    var request = api({
      type: 'chain',
      define: {
        request: (options) => (options)
      }
    })

    var a = request.get('a').qs({a: 1})
    var b = request.get('b').qs({b: 2})
    a.form({c: 3})

    t.deepEqual(a.request(), {method: 'GET', url: 'a', qs: {a: 1}, form: {c: 3}})
    t.deepEqual(b.request(), {method: 'GET', url: 'b', qs: {b: 2}})
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
        request: (options) => (options)
      }
    })
    t.deepEqual(
      request.select('u').where({a: 1}).gimme(),
      {method: 'GET', url: 'u', qs: {a: 1}})
  })
})
