const helpers = require('../utils/helpers/helper');
const Task = require('../models/Task');

class TaskService {
  createTask (params) {
    return new Promise((resolve, reject) => {
      try {
        let taskParams = helpers.validateAndGetTaskParams(params);
        let task = new Task(taskParams);
        return task
          .save()
          .then(task => resolve(task))
          .catch(e => reject(e));
      } catch (e) {
        reject(e);
      }
    });
  }
  getAllTasks () {
    return new Promise((resolve, reject) => {
      Task
        .find()
        .then(tasks => resolve(tasks))
        .catch(e => reject(e));
    });
  }
  updateStatus (taskID, status) {
    return new Promise((resolve, reject) => {
      Task
        .findOne({ _id: taskID })
        .then(task => {
          task.status = status; // === 'open' ? task.status = 'closed' : task.status = 'open';
          this.updateTaskByID(taskID, task)
            .then(r => resolve(r))
            .catch(e => reject(e));
        });
    });
  }

  deleteTaskById (id) {
    return new Promise((resolve, reject) => {
      Task
        .findOneAndDelete({ _id: id })
        .then(d => resolve(d))
        .catch(e => reject(e));
    });
  }
  getTaskByID (id) {
    return new Promise((resolve, reject) => {
      Task
        .findById({ _id: id })
        .then(d => resolve(d))
        .catch(e => reject(e));
    });
  }
  updateTaskByID (id, data) {
    return new Promise((resolve, reject) => {
      try {
        let taskParams = helpers.validateAndGetTaskParams(data);
        Task
          .findOneAndUpdate({ _id: id }, taskParams)
          .then(d => resolve(d))
          .catch(e => reject(e));
      } catch (e) {
        reject(e);
      }
    });
  }
}

module.exports = TaskService;
