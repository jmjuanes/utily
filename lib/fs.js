//Import dependencies
var fs = require('fs');

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

//Remove a list of files
module.exports.rm = function(files, cb)
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
