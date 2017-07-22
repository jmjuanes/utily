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

### File System functions 

#### utily.fs.checksum(file\[, options\], cb)

Generate the checksum of `file`. `options` can be an object with the following options: 

- `algorithm`: a `string` with the algorithm to generate the checksum. Default is `md5`.
- `encoding`: a `string` with the encoding. Default is `hex`.

If `options` is a non-object, it will be treated as the `options.algorithm` option.

```javascript
//Generate the md5 of the file 
utily.fs.checksum('/path/to/file.txt', function(error, sum)
{
  //Check the error 
  if(error){ /* Something went wrong */ }
  
  console.log('Checksum --> ' + sum);
});
```

#### utily.fs.exists(path, cb)

Check if the provided path exists, and then the `cb` method will be executed with two arguments (`error` and a boolean `exists` that indicates if the path exists).

```javascript
utily.fs.exists('/path/to/my/file.txt', function(error, exists)
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

#### utily.fs.isDir(path, cb)

Check if the provided path exists and is a directory or not.

```javascript
utily.fs.isDir('/path/to/my/directory', function(error, is_dir)
{
  //Check the error 
  if(error){ /* Something went wrong */ }
  
  //Check if is a directory 
  if(is_dir === true)
  {
    //Path exists and is a directory    
  }
  else
  {
    //Path does not exists ot is not a directory
  }
});
```

#### utily.fs.isFile(path, cb)

Check if the provided path exists and is a file or not.

```javascript
utily.fs.isDir('/path/to/my/file.txt', function(error, is_file)
{
  //Check the error 
  if(error){ /* Something went wrong */ }
  
  //Check if is a file
  if(is_file === true)
  {
    //Path exists and is a file
  }
  else
  {
    //Path does not exists or is not a file
  }
});
```

#### utily.fs.mkdir(path, cb)

Create a directory and all the subdirectories of `path`.

```javascript
//Create the directory and all the subdirectories (if does not exists)
utily.fs.mkdir('/path/to/my/directory', function(error)
{
  //Check the error 
  if(error){ /* Something went wrong */ }
  
  console.log('Directory created!');
});
```

#### utily.fs.size(file, cb)

Returns the size of the file. The callback function will be executed with an `error` object and the `size` of the file.

```javascript
//Get the size of the file 
utily.fs.size('/path/to/file.txt', function(error, size)
{
  //Check the error 
  if(error)
  {
    //Something went wrong...
  }
  
  console.log('The size of the file is: ' + size);
});
```


#### utily.fs.unlink(files, cb)

Remove a list of files. The `files` argument must be a `string` for a single file, or an `array` with the file paths to remove.

```javascript
//Remove multiple files
utily.fs.rm([ './file1.txt', './file2.txt' ], function(error)
{
  //Check if there is an error 
  if(error)
  {
    //Something went wrong...
  }
  
});

//Remove a single file 
utily.fs.rm('./another-file.txt', function(error)
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


### JSON functions 

#### utily.json.read(file\[, options\], callback)

Read a JSON `file` and convert it's content to a JSON object using [`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) method.

The `options` object will be passed to [`fs.readFile`](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback).

```javascript
//Read a JSON file 
utily.json.read('/my/file.json', 'utf8', function(error, data)
{
  //Check the error 
  if(error)
  {
    //Something went wrong
  }
  
  //Print the JSON object in console
  console.log(data);
});
```

#### utily.json.write(file, object\[, opt\], callback)

Converts a JSON `object` to string using the [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) and then it will be written to the provided `file` path.

The `options` object will be passed to [`fs.writeFile`](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback).

```javascript
//Initialize my object 
var obj = { key1: 'value1', key2: 'value2' };

//Write to a file 
utily.json.write('/my/file.json', obj, 'utf8', function(error)
{
  //Check the error 
  if(error)
  {
    //Something went wrong
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

#### utily.string.camel_case(str)

Return the camel-case format of `str`.

```javascript
utily.string.camel_case('hello world');  // -> 'helloWorld'
```

#### utily.string.capitalize(str)

Return the capitalized format of `str`.

```javascript
utily.string.capitalize('hello world');  // -> 'Hello world'
```

#### utily.string.unique()

Generate a unique random string of 15 characters.

```javascript
var str = utily.string.unique();  // -> str = 'wv1ufiqj5e6xd3k'
```


## License 

Under the [MIT LICENSE](./LICENSE).
