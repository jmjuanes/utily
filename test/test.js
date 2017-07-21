//Import dependencies
var assert = require('assert');
var fs = require('fs');
var path = require('path');
var utily = require('../index.js');

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

  //Test mkdir method
  describe('-> mkdir method', function()
  {
    //Create a folder
    it('should create the folders', function(done)
    {
      var folders = path.join(__dirname, './testing/folders/yeah');
      return utily.fs.mkdir(folders, function(error)
      {
        assert.equal(null, error);
        return utily.fs.exists(folders, function(error, exists)
        {
          assert.equal(null, error);
          assert.equal(true, exists);
          done();
        });
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
});

