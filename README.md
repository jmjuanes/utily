# utily

> A set of useful functions for node.js

[![npm](https://img.shields.io/npm/v/utily.svg?style=flat-square)](https://www.npmjs.com/package/utily)
[![npm](https://img.shields.io/npm/dt/utily.svg?style=flat-square)](https://www.npmjs.com/package/utily)

## Installation 

Use [npm](https://npmjs.com) to install this module:

```
npm install --save utily
```

## API 

### Object functions 

#### utily.object.keys(obj)

This is just [`Object.keys`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys).

```javascript
var keys = utily.object.keys({ a: 1, b: 2, c: 'hello' }); // --> keys = [ 'a', 'b', 'c' ]
```

#### utily.object.values(obj)

Returns an array of a given object's own enumerable property values. It's a ponyfill of the [ `Object.values`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values) method.

```javascript
var values = utily.object.values({ a: 1, b: 2, c: 'hello' }); // -> values = [ 1, 2, 'hello' ]
```

## License 

Under the [MIT LICENSE](./LICENSE).
