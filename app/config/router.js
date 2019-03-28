const controllers = require('../controllers');

module.exports = (app) => {
  app.get('/', controllers.taskController.listAllTasks);
  app.get('/addTask', controllers.taskController.getAddTaskForm);
  app.post('/addTask', controllers.taskController.createTask);
  app.get('/delete/:id', controllers.taskController.deleteTaskById);
  app.get('/edit/:id', controllers.taskController.editTaskByID);
  app.post('/edit/:id', controllers.taskController.updateTaskByID);
  app.post('/filterTasks', controllers.taskController.filterByCategory);
  app.get('/close/:id', controllers.taskController.changeStatusToClosed);
  app.get('/viewClosed', controllers.taskController.getAllClosedTasks);

  app.all('*', (req, res) => {
    res.status(404);
    res.send('404 Not Found!');
    res.end();
  });
};
