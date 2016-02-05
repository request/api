
# @request/api

Use this module to create sugar API for your HTTP client. You can also allow your users to define their own aliases.

```js
var api = require('@request/api')
var client = require('@request/client')
var extend = require('extend')

var config = {
  // HTTP verbs
  verb: {
    get: ['select']
  },
  // options that accept object
  object: {
    qs: ['where']
  },
  // options that accept simple value
  value: {
    callback: ['done']
  },
  // methods that require custom handling
  custom: {
    submit: ['gimme']
  }
}


function submit () {
  // `this` contains the options object that you usually pass to @request/core
  return client(this)
}

// pass `extend` compatible module, config data structure, and a submit method
var request = api(extend, config, submit)

request
  .select('http://localhost:6767')
  .where({a: 'b'})
  .done((err, res, body) => {
    // aaa
    // mazing
  })
  .gimme()
```

> See [@request/core][request-core] for more details.


  [request-core]: https://github.com/request/core
