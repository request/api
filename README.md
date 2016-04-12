
# @request/api

[![npm-version]][npm] [![travis-ci]][travis] [![coveralls-status]][coveralls]

```js
var api = require('@request/api')
var client = require('@request/client')

// API methods configuration
var config = {
  // HTTP methods
  method: {
    get: ['select']
  },
  // @request/core option methods
  option: {
    qs: ['where']
  },
  // custom methods
  custom: {
    request: ['fetch', 'snatch', 'submit']
  }
}

// custom methods implementation
var custom = {
  // pass any arguments to your custom methods
  request: function (callback) {
    if (callback) {
      // `this._options` contains the generated options object
      this._options.callback = callback
    }
    // the last method should return @request/core consumer
    return client(this._options)
    // return `this` if you want to chain further
  }
}

// initialize the API
var request = api(config, custom)

// GET http://localhost:6767?a=1
request
  .select('http://localhost:6767')
  .where({a: 1})
  .fetch((err, res, body) => {
    // request callback
  })
```

> See [@request/core][request-core] for more details.


  [npm-version]: http://img.shields.io/npm/v/@request/api.svg?style=flat-square (NPM Version)
  [travis-ci]: https://img.shields.io/travis/request/api/master.svg?style=flat-square (Build Status)
  [coveralls-status]: https://img.shields.io/coveralls/request/api.svg?style=flat-square (Test Coverage)

  [npm]: https://www.npmjs.org/package/@request/api
  [travis]: https://travis-ci.org/request/api
  [coveralls]: https://coveralls.io/r/request/api?branch=master

  [request-core]: https://github.com/request/core
