const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  taskTitle: { type: mongoose.Schema.Types.String, required: true },
  expectedDay: { type: mongoose.Schema.Types.String, required: true },
  taskDescription: { type: mongoose.Schema.Types.String, required: true },
  creationDate: { type: mongoose.Schema.Types.String, required: true },
  category: { type: mongoose.Schema.Types.String, required: true },
  status: { type: mongoose.Schema.Types.String, required: true }
});

let Task = mongoose.model('Task', taskSchema);

module.exports = Task;
