//Import dependencies
var assert = require('assert');
var fs = require('fs');
var path = require('path');
var utily = require('../index.js');

//Test common methods
describe('utily -> commons', function()
{
  //Each method
  describe('-> each method', function()
  {
    it('should iterate over all the elements in an array', function(done)
    {
      var list = [0, 1, 2, 3, 4];
      var counter = 0;
      utily.each(list, function(index, value)
      {
        assert.equal(counter, index);
        assert.equal(list[index], value);
        counter = counter + 1;
      });
      done();
    });

    it('should iterate over all the elements in an object', function(done)
    {
      var obj = { 'key1': 'value1', 'key2': 'value2' };
      var keys = Object.keys(obj);
      var counter = 0;
      utily.each(obj, function(key, value)
      {
        assert.equal(keys[counter], key);
        assert.equal(obj[key], value);
        counter = counter + 1;
      });
      done();
    });
  });

  //Each Async method
  describe('-> each async method', function()
  {
    it('should iterate over all the elements in an array', function(done)
    {
      var list = [0, 1, 2, 3, 4];
      var counter = 0;
      utily.eachAsync(list, function(index, value, next)
      {
        setTimeout(function()
        {
          assert.equal(counter, index);
          assert.equal(list[index], value);
          counter = counter + 1;
          next();
        }, 100);
      }, function(){ return done(); });
    });

    it('should iterate over all the elements in an object', function(done)
    {
      var obj = { 'key1': 'value1', 'key2': 'value2' };
      var keys = Object.keys(obj);
      var counter = 0;
      utily.eachAsync(obj, function(key, value, next)
      {
        setTimeout(function()
        {
          assert.equal(keys[counter], key);
          assert.equal(obj[key], value);
          counter = counter + 1;
          next();
        }, 100);
      }, function(){ return done(); });
    });
  });
});

//Test array methods
describe('utily -> array', function()
{
  //Test has method
  describe('-> has method', function()
  {
    it('should return true if item exists in the array', function(done)
    {
      assert.equal(utily.array.has([1, 2, 3], 3), true);
      done();
    });
    it('should return false if item does not exists in the array', function(done)
    {
      assert.equal(utily.array.has([1, 2, 3], 0), false);
      done();
    });
  });

  //Test max method
  describe('-> max method', function()
  {
    it('should return the maximum value of an array', function(done)
    {
      assert.equal(utily.array.max([5,4,7,3,9,-10]), 9);
      done();
    });
  });

  //Test min method
  describe('-> min method', function()
  {
    it('should return the minimum value of an array', function(done)
    {
      assert.equal(utily.array.min([5,4,7,3,9,-10]), -10);
      done();
    });
  });

  //Test remove method
  describe('-> range method', function()
  {
    it('should remove an element of the array', function(done)
    {
      var array = utily.array.remove([0, 1, 2, 3, 4, 5], 3);
      assert.equal(array.length, 5);
      assert.equal(array[2], 2);
      assert.equal(array[3], 4);
      assert.equal(array.indexOf(3), -1);
      done();
    });
  });
});

//Test the fs methods
describe('utily -> fs', function()
{
  //Test checksum method
  describe('-> checksum method', function()
  {
    var file = path.join(__dirname, './fs-checksum-test.txt');
    fs.writeFileSync(file, 'Hello\nThis is the content\n', 'utf8');
    it('should generate the correct checksum of the file', function(done)
    {
      return utily.fs.checksum(file, 'md5', function(error, sum)
      {
        assert.equal(null, error);
        assert.equal('2c1b03ff58b808e5bd56196131cc8505', sum);
        done();
      });
    });
  });

  //Test copy method
  describe('-> copy method', function()
  {
    //Copy files
    it('should copy a file that exists', function(done)
    {
      var file_source = path.join(__dirname, 'fs-copy-source.txt');
      var file_destination = path.join(__dirname, 'fs-copy-destination.txt');
      fs.writeFileSync(file_source, 'This is the content of the file 1', 'utf8');
      return utily.fs.copy(file_source, file_destination, function(error)
      {
        assert.equal(null, error);
        var content1 = fs.readFileSync(file_source, 'utf8');
        var content2 = fs.readFileSync(file_destination, 'utf8');
        assert.equal(content1, content2);
        done();
      });
    });

    //Display an error
    it('should return an error if source file does not exists', function(done)
    {
      var file_source = path.join(__dirname, 'fs-copy-source-unexistent.txt');
      var file_destination = path.join(__dirname, 'fs-copy-destination.txt');
      return utily.fs.copy(file_source, file_destination, function(error)
      {
        assert.notEqual(null, error);
        done();
      });
    });
  });

  //Test exists method
  describe('-> exists method', function()
  {
    //Folder that does not exists
    it('should return false if path does not exists', function(done)
    {
      return utily.fs.exists(path.join(__dirname, './inexistent'), function(error, exists)
      {
        assert.equal(null, error);
        assert.equal(false, exists);
        done();
      });
    });
    //Folder that exists
    it('should return true if path exists', function(done)
    {
      return utily.fs.exists(__dirname, function(error, exists)
      {
        assert.equal(null, error);
        assert.equal(true, exists);
        done();
      });
    });
  });

  //Test isDir method
  describe('-> isDir method', function()
  {
    //Folder that exists
    it('should return that the folder path is a directory', function(done)
    {
      return utily.fs.isDir(__dirname, function(error, exists)
      {
        assert.equal(null, error);
        assert.equal(true, exists);
        done();
      });
    });

    //Path is a file
    it('should return that the file path is not a directory', function(done)
    {
      var file = path.join(__dirname, 'test.js');
      return utily.fs.isDir(file, function(error, exists)
      {
        assert.equal(null, error);
        assert.equal(false, exists);
        done();
      });
    });

    //Path does not exists
    it('should return that the fake path is not a directory', function(done)
    {
      var fake = path.join(__dirname, './fake/path');
      return utily.fs.isDir(fake, function(error, exists)
      {
        assert.equal(null, error);
        assert.equal(false, exists);
        done();
      });
    })
  });

  //Test isFile method
  describe('-> isFile method', function()
  {
    //Path is a file that exists
    it('should return that the file path is a file', function(done)
    {
      var file = path.join(__dirname, 'test.js');
      return utily.fs.isFile(file, function(error, exists)
      {
        assert.equal(null, error);
        assert.equal(true, exists);
        done();
      });
    });

    //Path is a folder
    it('should return that the folder path is not a file', function(done)
    {
      return utily.fs.isFile(__dirname, function(error, exists)
      {
        assert.equal(null, error);
        assert.equal(false, exists);
        done();
      });
    });

    //Path does not exists
    it('should return that the fake path is not a file', function(done)
    {
      var fake = path.join(__dirname, './fake/path.txt');
      return utily.fs.isFile(fake, function(error, exists)
      {
        assert.equal(null, error);
        assert.equal(false, exists);
        done();
      });
    })
  });

  //Test mkdir method
  describe('-> mkdir method', function()
  {
    //Create a folder
    it('should create the folders', function(done)
    {
      var folders = path.join(__dirname, './new/folders/yeah');
      return utily.fs.mkdir(folders, function(error)
      {
        assert.equal(null, error);
        assert.equal(true, fs.existsSync(folders));
        done();
      });
    });
  });

  //Test size method
  describe('-> size method', function()
  {
    //Check the file size
    it('should get the real file size', function(done)
    {
      var file = path.join(__dirname, './fs-size-test.txt');
      fs.writeFileSync(file, 'This is the content of the \nfile\n', 'utf8');
      return utily.fs.size(file, function(error, size)
      {
        assert.equal(null, error);
        assert.equal(33, size);
        done();
      });
    });
  });

  //Test unlink method
  describe('-> unlink method', function()
  {
    //Delete a list of file
    it('should delete a list of files', function(done)
    {
      var file1 = path.join(__dirname, './fs-unlink-test1.txt');
      var file2 = path.join(__dirname, './fs-unlink-test2.txt');
      fs.writeFileSync(file1, 'Test 1', 'utf8');
      fs.writeFileSync(file2, 'Test 2', 'utf8');
      return utily.fs.unlink([ file1, file2 ], function(error)
      {
        assert.equal(null, error);
        assert.equal(false, fs.existsSync(file1));
        assert.equal(false, fs.existsSync(file2));
        done();
      });
    });
  });
});

//Test json methods
describe('utily -> json', function()
{
  describe('-> read method', function()
  {
    it('should read a JSON file', function(done)
    {
      var json_read_obj = { key1: 'value1', key2: 'value2' };
      var json_read_path = path.join(__dirname, './json-read-test1.json');
      fs.writeFileSync(json_read_path, JSON.stringify(json_read_obj), 'utf8');
      return utily.json.read(json_read_path, function(error, data)
      {
        assert.equal(null, error);
        assert.equal(json_read_obj.key1, data.key1);
        assert.equal(json_read_obj.key2, data.key2);
        done();
      });
    });
    it('should display error if file doest not exists', function(done)
    {
      var json_read_path = path.join(__dirname, './json-read-test2.json');
      return utily.json.read(json_read_path, function(error, data)
      {
        assert.notEqual(null, error);
        assert.equal('ENOENT', error.code);
        done();
      });
    });
    it('should display error if content is not a valid JSON', function(done)
    {
      var json_read_path = path.join(__dirname, './json-read-test3.json');
      fs.writeFileSync(json_read_path, 'Invalid JSON content', 'utf8');
      return utily.json.read(json_read_path, function(error, data)
      {
        assert.notEqual(null, error);
        done();
      });
    });
  });

  describe('-> write method', function()
  {
    it('should write a JSON file', function(done)
    {
      var json_write_path = path.join(__dirname, './json-write-test1.json');
      var json_write_obj = { key1: 'value1', key2: 'value2' };
      return utily.json.write(json_write_path, json_write_obj, function(error)
      {
        assert.equal(null, error);
        try
        {
          var content = fs.readFileSync(json_write_path, 'utf8');
          content = JSON.parse(content);
        }
        catch(error)
        {
          return done(error);
        }
        assert.equal(content.key1, json_write_obj.key1);
        assert.equal(content.key2, json_write_obj.key2);
        done();
      });
    });
  });
});

//Test object methods
describe('utily -> object', function()
{
  //Test each method
  describe('-> each method', function()
  {
    it('should iterate over all the elements in an object', function(done)
    {
      var obj = { key1: 'value1', key2: 'value2', key3: 'value3' };
      utily.object.each(obj, function(key, value)
      {
        assert.equal(value, obj[key]);
      });
      done();
    });
  });
});

//Test task methods
describe('utily -> task', function()
{
  it('should run tasks in order', function(done)
  {
    var counter = 0;
    utily.task.add('test1', function(next)
    {
      assert.equal(counter, 0);
      counter = counter + 1;
      setTimeout(function(){ return next(); }, 500);
    });
    utily.task.add('test1', function(next)
    {
      assert.equal(counter, 1);
      counter = counter + 1;
      setTimeout(function(){ return next(); }, 500);
    });
    utily.task.add('test1', function(next)
    {
      assert.equal(counter, 2);
      next();
      return done();
    });
  });

  it('should pause and resume tasks', function(done)
  {
    var ready = false;
    utily.task.add('test2', function(next)
    {
      //Pause the queue
      utily.task.pause('test2');
      next();
      setTimeout(function(){ ready = true; utily.task.resume('test2'); }, 1000);
    });
    utily.task.add('test2', function(next)
    {
      assert.equal(ready, true);
      next();
      return done();
    });
  });

  it('should cancel a task', function(done)
  {
    var cancelled = true;
    utily.task.add('test3', function(next)
    {
      setTimeout(function(){ return next(); }, 500);
    });
    utily.task.add('test3', function(next)
    {
      cancelled = false;
      next();
    });
    utily.task.cancel('test3');
    setTimeout(function()
    {
      assert.equal(cancelled, true);
      return done();
    }, 1500);
  });
});

