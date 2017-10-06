//Import dependencies
var fs = require('fs');
var path = require('path');

//Import utily methods
var utily_fs = require('./fs.js');
var utily_queue = require('./queue.js');

//Initialize the json object
var json = {};

//Read a JSON file
json.read = function(file, opt, cb)
{
  //Parse the callback method
  var cb = (typeof opt === 'function') ? opt : cb;

  //Parse the options
  var opt = (typeof opt === 'function') ? {} : opt;

  //Check the encoding value
  if(typeof opt.encoding !== 'string'){ opt.encoding = 'utf8'; }

  //Read the file
  return fs.readFile(file, opt, function(error, data)
  {
    //Check the error
    if(error){ return cb(error, null); }

    //Output json object
    var obj = null;

    //Convert the data to json
    try
    {
      //Convert to a json object
      obj = JSON.parse(data);
    }
    catch(e)
    {
      //Do the callback with the parse error
      return cb(e, null);
    }

    //Do the callback with the parsed JSON
    return cb(null, obj);
  });
};

//Write a JSON file
json.write = function(file, content, opt, cb)
{
  //Parse the callback method
  var cb = (typeof opt === 'function') ? opt : cb;

  //Parse the options
  var opt = (typeof opt === 'function') ? {} : opt;

  //Check for string options
  if(typeof opt === 'string'){ opt = { encoding: opt }; }

  //Check the encoding value
  if(typeof opt.encoding !== 'string'){ opt.encoding = 'utf8'; }

  //Check the space option
  if(typeof opt.space !== 'string'){ opt.space = '  '; }

  //Content in string format
  var data = null;

  //Convert the content to string
  try
  {
    data = JSON.stringify(content, null, opt.space);
  }
  catch(error)
  {
    //Do the callback with the error
    return cb(error);
  }

  //Write to the file
  return fs.writeFile(file, data, opt, function(error)
  {
    //Do the callback with the error
    return cb(error);
  });
};

//Json storage
json.storage = function(opt, cb)
{
  //Check the options object
  if(typeof opt !== 'object'){ throw new Error('No options object provided'); }

  //Check the storage path option
  if(typeof opt.path !== 'string'){ throw new Error('No storage path provided'); }

  //Save the database path
  this.path = path.resolve(process.cwd(), opt.path);

  //Save the default encoding
  this.encoding = (typeof opt.encoding === 'string') ? opt.encoding : 'utf8';

  //Create the database directory
  utily_fs.mkdir(this.path, function(error)
  {
    //Check the callback method
    if(typeof cb !== 'function'){ return; }

    //Call the callback method
    return cb(error);
  });

  //Return this
  return this;
};

//Get a document file path
json.storage.prototype.file = function(id)
{
  //Return the document path
  return path.join(this.path, id + '.json');
};

//Get the list of documents available
json.storage.prototype.documents = function(cb)
{
  //Read the directory
  return utily_fs.readdir(this.path, function(error, files)
  {
    //Check the error
    if(error){ return cb(error, null);}

    //Output files list
    var list = {};

    //For each file path
    files.forEach(function(file)
    {
      //Check the file extension
      if(path.extname(file) !== '.json'){ return; }

      //Get the file id
      var id = path.basename(file, '.json');

      //Add the json file path
      list[id] = { id: id, path: file };
    });

    //Call the callback with the list of documents
    return cb(null, list);
  });
};

//Get a document
json.storage.prototype.get = function(id, cb)
{
  //Get the file path
  var file = this.file(id);

  //Register the task queue
  return utily_queue.add(file, function(next)
  {
    //Read the content of the document
    return json.read(file, function(error, data)
    {
      //Next task on the queue
      next();

      //Return the content of the document
      return cb(error, data);
    });
  });
};

//Set a document content
json.storage.prototype.set = function(id, obj, cb)
{
  //Get the document id
  var file_id = (typeof id !== 'string') ? utily.string.unique() : id.trim();

  //Get the file content
  var file_content = (typeof id === 'object') ? id : obj;

  //Get the document path
  var file_path = this.file(file_id);

  //Register the task in the queue
  return utily_queue.add(file_path, function(next)
  {
    //Read the file path
    return json.read(file_path, function(error, data)
    {
      //Check the error
      if(error)
      {
        //Check for not found error
        if(error.code === 'ENOENT')
        {
          //File does not exists, initialize the data object
          data = {};
        }
        else
        {
          //Next task
          next();

          //Another error -> call the callback with the error
          return cb(error, null);
        }
      }

      //Assign the new values
      data = Object.assign(data, file_content);

      //Save to the file
      return json.write(file_path, data, function(error)
      {
        //Next task
        next();

        //Call the callback
        return cb(error, data);
      });
    });
  });
};

//Remove a document
json.storage.prototype.remove = function(id, cb)
{
  //Get the file path
  var file = this.file(id);

  //Register the task queue
  return utily_queue.add(file, function(next)
  {
    //Delete the file
    return utily_fs.unlink(file, function(error)
    {
      //Next task in the queue
      next();

      //Call the callback method
      return cb(error)
    });
  });
};

//Exports the json object
module.exports = json;
