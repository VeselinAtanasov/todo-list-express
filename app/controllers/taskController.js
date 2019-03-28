const helper = require('../utils/helpers/helper');
const TaskService = require('../services/TaskService.js');
// const constants = require('../utils/helpers/constants');

module.exports = {
  listAllTasks: (req, res) => {
    let taskService = new TaskService();
    taskService
      .getAllTasks()
      .then(data => {
        let tasks = helper.filterTasksByCategory(data, 'all');
        res.render('tasks/allTasks.hbs', { tasks });
      });
  },
  getAddTaskForm: (req, res) => {
    res.render('tasks/addTask.hbs');
  },
  createTask: (req, res) => {
    let taskService = new TaskService();
    let creationDate = helper.getCurrentDate();
    req.body.creationDate = creationDate;
    req.body.status = 'open';

    taskService
      .createTask(req.body).then(task => res.redirect('/'))
      .catch(e => res.render('tasks/addTask.hbs', { error: e.message }));
  },
  deleteTaskById: (req, res) => {
    let id = req.params.id;
    let taskService = new TaskService();
    taskService
      .deleteTaskById(id)
      .then(deleted => res.redirect('/'))
      .catch(e => res.render('tasks/allTasks.hbs', { error: e.message }));
  },
  editTaskByID: (req, res) => {
    let id = req.params.id;
    let taskService = new TaskService();
    taskService
      .getTaskByID(id)
      .then(task => {
        res.render('tasks/editTask.hbs', task);
      })
      .catch(e => res.render('tasks/allTasks.hbs', { error: e.message }));
  },
  updateTaskByID: (req, res) => {
    let id = req.params.id;
    let creationDate = helper.getCurrentDate();
    req.body.creationDate = creationDate;
    let data = req.body;
    let taskService = new TaskService();
    taskService
      .updateTaskByID(id, data)
      .then(task => {
        res.redirect('/');
      })
      .catch(e => res.redirect(`/edit/${id}`));
  },
  filterByCategory: (req, res) => {
    let route = helper.getRouteByCategory(req.body);
    let taskService = new TaskService();
    taskService
      .getAllTasks()
      .then(data => {
        let tasks = helper.filterTasksByCategory(data, route);
        res.render('tasks/allTasks.hbs', { tasks, filter: route });
      })
      .catch(e => res.render('tasks/allTasks.hbs', { error: e.message }));
  },
  changeStatusToClosed: (req, res) => {
    let id = req.params.id;
    let taskService = new TaskService();
    taskService
      .updateStatus(id)
      .then(data => res.redirect('/'))
      .catch(e => res.render('tasks/allTasks.hbs', { error: e.message }));
  },
  getAllClosedTasks: (req, res) => {
    let taskService = new TaskService();
    taskService
      .getAllTasks()
      .then(data => {
        let tasks = helper.filterTasksByCategory(data, 'all', true);
        res.render('tasks/allTasks.hbs', { tasks });
      });
  }
};
