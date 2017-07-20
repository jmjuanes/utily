//Import dependencies
var fs = require('fs');
var crypto = require('crypto');
var path = require('path');
var mkdirp = require('mkdirp');
var rmr = require('rmr');

//Generate the checksum of a file
module.exports.checksum = function(file, opt, cb)
{
  //Check the options
  if(typeof opt === 'function')
  {
    //Save the new callback method
    cb = opt;

    //Initialize the options object
    opt = {};
  }

  //Check the algorithm option
  if(typeof opt.algorithm !== 'string'){ opt.algorithm = 'md5'; }

  //Check the encoding option
  if(typeof opt.encoding !== 'string'){ opt.encoding = 'hex'; }

  //Check if the file exists
  return fs.stat(file, function(error, stat)
  {
    //Check the error
    if(error){ return cb(error, null); }

    //Check for not a file
    if(stat.isFile() ===false){ return cb(new Error('Provided path is not a file'), null); }

    //Create the new hash
    var hash = crypto.createHash(opt.algorithm);

    //Initialize the read stream
    var reader = fs.createReadStream(file);

    //Read data from file
    reader.on('data', function(data)
    {
      //Update the hash with the new chunk of data
      hash.update(data);
    });

    //Data read end
    reader.on('end', function()
    {
      //Return the checksum fo the file
      return cb(null, hash.digest(opt.encoding));
    });

    //Error event handler
    reader.on('error', function(error)
    {
      //Do the callback with the error
      return cb(error, null);
    });
  });
};

//Check if a file exists
module.exports.exists = function(file, cb)
{
  //Get the status of the file
  return fs.stat(file, function(error, stats)
  {
    //Check the error
    if(error)
    {
      //Check the error code
      if(error.code !== 'ENOENT')
      {
        //Do the callback with the error
        return cb(error, false);
      }
      else
      {
        //Do the callback without error
        return cb(null, false);
      }
    }

    //Do the callback with the boolean if file exists
    return cb(null, stats.isFile());
  });
};

//Create a directory
module.exports.mkdir = mkdirp;

//Remove a list of files
module.exports.unlink = function(files, cb)
{
  //Check the list of files
  if(typeof files === 'string'){ files = [ files ]; }

  //Remove file method
  var remove_file = function(index)
  {
    //Check the index
    if(index >= files.length)
    {
      //Do the callback
      return cb(null);
    }

    //Get the file to remove
    var file = files[index];

    //Remove the file
    fs.unlink(file, function(error)
    {
      //Check the error
      if(error)
      {
        //Check the error code
        if(error.code !== 'ENOENT')
        {
          //Do the callback with the error
          return cb(error);
        }
      }

      //Continue with the next file
      return remove_file(index + 1);
    });
  };

  //Remove the first file of the list
  return remove_file(0);
};

//Get the size of a file
module.exports.size = function(file, cb)
{
  //Get the status of the file
  return fs.stat(file, function(error, stats)
  {
    //Check the error
    if(error){ return cb(error, 0); }

    //Do the callback with the size of the file
    return cb(null, stats.size);
  });
};
