
# @request/api

[![npm-version]][npm] [![travis-ci]][travis] [![coveralls-status]][coveralls]


## Basic API

```js
request('url')
request({options})
request('url', function callback (err, res, body) {})
request({options}, function callback (err, res, body) {})
request('url', {options}, function callback (err, res, body) {})

request[HTTP_VERB]('url')
request[HTTP_VERB]({options})
request[HTTP_VERB]('url', function callback (err, res, body) {})
request[HTTP_VERB]({options}, function callback (err, res, body) {})
request[HTTP_VERB]('url', {options}, function callback (err, res, body) {})
```

```js
var api = require('@request/api')
var client = require('@request/client')

// initialize the API
var request = api({
  type: 'basic',
  // pass HTTP request function
  // that accepts @request/interface options
  request: client
})

// GET http://localhost:6767?a=1
request.get('http://localhost:6767', {qs: {a: 1}}, (err, res, body) => {
  // request callback
})
```


## Chain API

```js
var api = require('@request/api')
var client = require('@request/client')

// initialize the API
var request = api({
  type: 'chain',
  // API methods configuration
  config: {
    // HTTP methods
    method: {
      get: ['select'],
      // ...
    },
    // @request/interface option methods
    option: {
      qs: ['where'],
      // ...
    },
    // custom methods
    custom: {
      request: ['fetch', 'snatch', 'submit'],
      // ...
    }
  },
  // custom methods implementation
  define: {
    // pass any arguments to your custom methods
    request: function (callback) {
      if (callback) {
        // `this._options` contains the generated options object
        this._options.callback = callback
      }
      // the last method should return @request/interface consumer
      return client(this._options)
      // or
      return this // if you want to chain further
    }
  }
})

// GET http://localhost:6767?a=1
request
  .select('http://localhost:6767')
  .where({a: 1})
  .fetch((err, res, body) => {
    // request callback
  })
```


  [npm-version]: http://img.shields.io/npm/v/@request/api.svg?style=flat-square (NPM Version)
  [travis-ci]: https://img.shields.io/travis/request/api/master.svg?style=flat-square (Build Status)
  [coveralls-status]: https://img.shields.io/coveralls/request/api.svg?style=flat-square (Test Coverage)

  [npm]: https://www.npmjs.org/package/@request/api
  [travis]: https://travis-ci.org/request/api
  [coveralls]: https://coveralls.io/r/request/api?branch=master
