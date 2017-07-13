# utily

> A set of useful functions for node.js

[![npm](https://img.shields.io/npm/v/utily.svg?style=flat-square)](https://www.npmjs.com/package/utily)
[![npm](https://img.shields.io/npm/dt/utily.svg?style=flat-square)](https://www.npmjs.com/package/utily)

## Installation 

Use [npm](https://npmjs.com) to install this module:

```
npm install --save utily
```

Now you can import it into your project:

```javascript
var utily = require('utily');
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


### Is functions

A set of functions to check the type of a given value. 

#### utily.is.undefined(value)

Return true if `value` is undefined.

```javascript
var a;
var b = 'Hello';
utily.is.undefined(a);  // -> true, `a` is not defined
utily.is.undefined(b);  // -> false, `b` is a string
```

#### utily.is.string(value)

Return true if `value` is a string.

```javascript
utily.is.string('Hello world');   // -> true 
utily.is.string('');              // -> true
utily.is.string({ a: 'Hello' });  // -> false
```

#### utily.is.object(value)

Return true if `value` is an object.

```javascript
utily.is.object({});    // -> true
utily.is.object(null);  // -> false 
```

#### utily.is.array(value)

Return true if `value` is an array.

```javascript
utily.is.array([ 1, 2, 3 ]);  // -> true 
utily.is.array({ a: true });  // -> false
```

#### utily.is.stream(value)

Return true if `value` is a stream.

```javascript
utily.is.stream(fs.createReadStream('file.txt'));  // -> true
utily.is.stream({ });                              // -> false
```

#### utily.is.null(value)

Return true if `value` is `null`.

```javascript
utily.is.null(null);  // -> true
utily.is.null({ });   // -> false
```

#### utily.is.integer(value)

Return true if `value` is an integer number.

```javascript
utily.is.integer(45);   // -> true
utily.is.integer(2.5);  // -> false
```

#### utily.is.number(value)

Return true if `value` is a number;

```javascript
utily.is.number(1235.2);  // --> true
utily.is.number('1234');  // -> false
```

#### utily.is.boolean(value)

Return true if `value` is a boolean.

```javascript
utily.is.boolean(true);  // -> true  
utily.is.boolean(0);     // -> false
```

#### utily.is.function(value)

Return true if `value` is a function.

```javascript
utily.is.function(function(){ return 0; });  // -> true
```

#### utily.is.buffer(value)

Return true if `value` is a buffer.

```javascript
utily.is.buffer(new Buffer(10));  // -> true
```

#### utily.is.regexp(value)

Return true if `value` is a regular expression.

```javascript
utily.is.regexp(/\s/g);  // -> true
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


### String functions 

#### utily.string.is_empty(str)

Return true if `str` is an empty string.

```javascript
utily.string.is_empty('');   // -> true
utily.string.is_empty(' ');  // -> false
```

#### utily.string.is_lowercase(str)

Return true if `str` is a string in lowercase format.

```javascript
utily.string.is_lowercase('hello world');  // -> true
utily.string.is_lowercase('Hello World');  // -> false
```

#### utily.string.is_uppercase(str)

Return true if `str` is a string in uppercase format;

```javascript
utily.string.is_uppercase('HELLO WORLD');  // -> true
utily.string.is_uppercase('Hello World');  // -> false
```


## License 

Under the [MIT LICENSE](./LICENSE).
