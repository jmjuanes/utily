//Each method
module.exports.each = function(list, fn)
{
  //Check for object type
  if(typeof list !== 'object' || list === null){ throw new Error('No array or object provided'); }

  //Check for no function provided
  if(typeof fn !== 'function'){ throw new Error('No iterator function provided'); }

  //Check if object is an array
  var is_array = Array.isArray(list);

  //Initialize the keys object
  var keys = (is_array) ? { length: list.length } : Object.keys(list);

  //Read all
  for(var i = 0; i < keys.length; i++)
  {
    //Get the key
    var key = (is_array) ? i : keys[i];

    //Get the value
    var value = (is_array) ? list[i] : list[keys[i]];

    //Call the provided method with the element of the array
    var result = fn.call(key, value);

    //Check for undefined result
    if(typeof result === 'undefined'){ continue; }

    //Check to break the loop
    if(result === false){ break; }
  }
};

//Each async method
module.exports.eachAsync = function(list, fn, cb)
{
  //Check for object type
  if(typeof list !== 'object' || list === null){ throw new Error('No array or object provided'); }

  //Check for no function provided
  if(typeof fn !== 'function'){ throw new Error('No iterator function provided'); }

  //Check the callback method
  if(typeof cb !== 'function'){ cb = function(){ return; }; }

  //Check if object is an array
  var is_array = Array.isArray(list);

  //Initialize the keys object
  var keys = (is_array) ? { length: list.length } : Object.keys(list);

  //Call each element of the array
  var each_async = function(index)
  {
    //Check the index value
    if(index >= keys.length)
    {
      //Do the callback and exit
      return cb(null);
    }
    else
    {
      //Get the key
      var key = (is_array) ? i : keys[i];

      //Get the value
      var value = (is_array) ? list[i] : list[keys[i]];

      //Call the provided method with the element of the array
      return fn.call(key, value, function(error)
      {
        //Check the error
        if(error)
        {
          //Do the callback with the provided error
          return cb(error);
        }
        else
        {
          //Continue with the next item on the list
          return each_async(index + 1);
        }
      });
    }
  };

  //Start with the queue
  return each_async(0);
};
