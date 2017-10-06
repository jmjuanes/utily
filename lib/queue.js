//Queue tasks list
var queue = {};

//Run a queue
var queue_run = function(tag)
{
  //Check if the queue exists
  if(typeof queue[tag] !== 'object'){ return; }

  //Check if queue is paused
  if(queue[tag].paused === true)
  {
    //Set task queue running false
    queue[tag].running = false;

    //Exit run function
    return;
  }

  //Check the number of tasks on this path
  if(queue[tag].tasks.length === 0)
  {
    //Delete this path object
    delete queue[tag];
  }
  else
  {
    //Set queue running
    queue[tag].running = true;

    //Get the task to run
    var task = queue[tag].tasks.shift();

    //Run this task
    return task.call(null, function()
    {
      //Continue with the next task
      return process.nextTick(function()
      {
        //Continue with the next task in the queue
        return queue_run(path);
      });
    });
  }
};

//Add a new function to the queue
module.exports.add = function(tag, task)
{
  //Check the tag
  if(typeof tag !== 'string'){ throw new Error('No tag queue provided'); }

  //Check the task function
  if(typeof task !== 'function'){ throw new Error('No task function provided'); }

  //Check if this tag exists
  if(typeof queue[tag] === 'undefined')
  {
    //Initialize the tasks list
    queue[tag] = { tasks: [task ], running: false, paused: false };

    //Run the queue
    return queue_run(tag);
  }
  else
  {
    //Add the task method
    queue[tag].tasks.push(task);
  }
};

//Cancel the tasks associated with a tag
module.exports.cancel = function(tag)
{
  //Check if this tag exists in the queue
  if(typeof queue[tag] !== 'object'){ return; }

  //Delete this tag tasks
  delete queue[tag];
};

//Pause a task queue
module.exports.pause = function(tag)
{
  //Check if this tag exists in the queue
  if(typeof queue[tag] !== 'object'){ return; }

  //Pause this tag
  queue[tag].paused = true;
};

//Resume a task queue
module.exports.resume = function(tag)
{
  //Check if this tag exists in the queue
  if(typeof queue[tag] !== 'object'){ return; }

  //Check if this tag is paused
  if(queue[tag].paused === false){ return; }

  //Set queue paused as false
  queue[tag].paused = false;

  //Check if queue is running
  if(queue[tag].running === true){ return; }

  //Resume the queue
  return queue_run(tag);
};
