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

//Generate the camelCase varsion of a string
module.exports.camel_case = function(str)
{
  //check for string
  if(typeof str !== 'string'){return str; }

  //Generate the string in camelCase format
  return str.replace(/^([A-Z])|[\s-_](\w)/g, function(match, reg1, reg2)
  {
    //Check the second match
    if(typeof reg2 !== 'undefined' && reg2)
    {
      //Return the second match
      return reg2.toUpperCase();
    }
    else
    {
      //Return the first match
      return reg1.toLowerCase();
    }
  });
};

//Capitalize a string
module.exports.capitalize = function(str)
{
  //Return the string with the first character in upper case
  return str.charAt(0).toUpperCase() + str.slice(1);
};
