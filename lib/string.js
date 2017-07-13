//Check if a string is empty
module.exports.is_empty = function(str)
{
  //Check for string
  if(typeof str !== 'string'){ return false; }

  //Check the length of the string
  return str.length === 0;
};

//Check if a string is in lower case format
module.exports.is_lowercase = function(str)
{
  //Check for string
  if(typeof str !== 'string'){ return false; }

  //Check for lowercase
  return str.toLowerCase() === str;
};

//Check if a string is in upper case format
module.exports.is_uppercase = function(str)
{
  //Check for string
  if(typeof str !== 'string'){ return false; }

  //Check for uppercase
  return str.toUpperCase() === str;
};
