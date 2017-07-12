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
