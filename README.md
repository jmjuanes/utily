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

### File functions 

#### utily.file.exists(file, cb)

Check if the file exists, and then the `cb` method will be executed with two arguments (`error` and a boolean `exists` that indicates if the file exists).

```javascript
utily.file.exists('/path/to/my/file.txt', function(error, exists)
{
  //Check the error 
  if(error)
  {
    //Something went wrong...
  }
  
  //Check if the file exists 
  if(exists === true)
  {
    //File exists 
  }
  else 
  {
    //File does not exists...
  }
});
```

#### utily.file.rm(files, cb)

Remove a list of files. The `files` argument must be a `string` for a single file, or an `array` with the file paths to remove.

```javascript
//Remove multiple files
utily.file.rm([ './file1.txt', './file2.txt' ], function(error)
{
  //Check if there is an error 
  if(error)
  {
    //Something went wrong...
  }
  
});

//Remove a single file 
utily.file.rm('./another-file.txt', function(error)
{
  //Check if there is an error 
  if(error)
  {
    //Something went wrong...
  }
  
});
```

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
