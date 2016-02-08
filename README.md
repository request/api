
# @request/api

[![npm-version]][npm] [![travis-ci]][travis] [![coveralls-status]][coveralls]

Use this module to create sugar API for your HTTP client. You can also allow your users to define their own method aliases.

```js
var api = require('@request/api')
var client = require('@request/client')

// all API methods and their aliases
var config = {
  // HTTP methods
  method: {
    get: ['select']
  },
  // @request/core option methods
  option: {
    qs: ['where'],
    callback: ['done']
  },
  // custom methods
  custom: {
    check: [],
    submit: ['gimme']
  }
}

// custom method implementation
var custom = {
  // `host` is parameter passed to your method
  check: function (options, host) {
    if (/localhost/.test(host)) {
      options.url += ':6767'
    }
    // `this` contains the API itself, for chaining purposes
    return this
  },
  // `options` contains the generated options object from the preceding methods
  submit: function (options) {
    // the last method should return a @request/core consumer
    return client(options)
  }
}

var request = api(config, custom)

// GET http://localhost:6767?a=b
request
  .select('http://localhost')
  .check('localhost')
  .where({a: 'b'})
  .done((err, res, body) => {
    // request callback
  })
  .gimme()
```

> See [@request/core][request-core] for more details.


  [npm-version]: http://img.shields.io/npm/v/@request/api.svg?style=flat-square (NPM Version)
  [travis-ci]: https://img.shields.io/travis/request/api/master.svg?style=flat-square (Build Status)
  [coveralls-status]: https://img.shields.io/coveralls/request/api.svg?style=flat-square (Test Coverage)

  [npm]: https://www.npmjs.org/package/@request/api
  [travis]: https://travis-ci.org/request/api
  [coveralls]: https://coveralls.io/r/request/api?branch=master

  [request-core]: https://github.com/request/core
