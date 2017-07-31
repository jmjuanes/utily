//Each method
module.exports.each = function(list, fn)
{
  //Check for object type
  if(typeof list !== 'object'){ throw new Error('No array provided'); }

  //Check if object is an array
  if(Array.isArray(list) === false){ throw new Error('No array provided'); }

  //Read all
  for(var i = 0; i < list.length; i++)
  {
    //Call the provided method with the element of the array
    var result = fn.call(list[i], i, list);

    //Check for undefined result
    if(typeof result === 'undefined'){ continue; }

    //Check to break the loop
    if(result === false){ break; }
  }
};
