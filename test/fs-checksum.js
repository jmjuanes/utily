//Import dependencies
var utily = require('../index.js');

//Generate the checksum of the file
utily.fs.checksum('./file.txt', 'md5', function(error, sum)
{
  //Display the error
  console.log(error);

  //Display the checksum
  console.log('Checksum: ' + sum);
});
