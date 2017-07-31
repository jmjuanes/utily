//Each method
module.exports.each = function(list, fn)
{
  //Check for object type
  if(typeof list !== 'object'){ throw new Error('No array or object provided'); }

  //Check for no function provided
  if(typeof fn !== 'function'){ throw new Error('No function to call provided'); }

  //Check if object is an array
  var is_array = Array.isArray(list);

  //Initialize the keys object
  var keys = (is_array) ? { length: list.length } : Object.keys(list);

  //Read all
  for(var i = 0; i < keys.length; i++)
  {
    //Get the value
    var value = (is_array) ? list[i] : list[keys[i]];

    //Call the provided method with the element of the array
    var result = fn.call(value, i, list);

    //Check for undefined result
    if(typeof result === 'undefined'){ continue; }

    //Check to break the loop
    if(result === false){ break; }
  }
};
