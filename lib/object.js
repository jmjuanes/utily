//Get the keys of an object
module.exports.keys = function(obj)
{
  //Return the object keys
  return Object.keys(obj);
};

//Get the values of an object
module.exports.values = function(obj)
{
  //Return the list of values of this object
  return Object.keys(obj).map(function(key)
  {
    //Replace with the value associated
    return obj[key];
  });
};

//Execute a function for each pair key-value in an object
module.exports.each = function(obj, fn)
{
  //Iterate over all the elements in the object
  Object.keys(obj).forEach(function(key)
  {
    //Call the function
    fn.call(null, key, obj[key]);
  });
};
