//Check if an element exists inside the array
module.exports.has = function(array, item)
{
  //Return if the element exists
  return array.indexOf(item) !== -1;
};

//Remove an element of the array
module.exports.remove = function(array, item)
{
  //Get the index of the item
  var index = array.indexOf(item);

  //Check the index
  if(index !== -1)
  {
    //Remove the item from the array
    array.splice(index, 1);
  }

  //Return the array
  return array;
};
