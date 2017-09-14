//Delete an element of the array
module.exports.delete = function(array, item)
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
