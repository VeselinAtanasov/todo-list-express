module.exports = {
  dbConstants: {
    DB_CONNECTION_STRING: 'mongodb://Admin:admin123@ds123346.mlab.com:23346/todo_list',
    DB_PORT: 3000
  },
  cssConstants: {
    CSS_GREEN_BOX: 'greenCSS',
    CSS_RED_BOX: 'redCSS',
    CSS_CLOSED: 'closedCSS'
  },
  STATUS_CLOSED: 'closed',
  categories: {
    ALL: 'all',
    OTHER: 'other',
    WORK: 'work',
    PERSONAL: 'personal'
  },
  MISSING_PARAMS: 'You are trying to post a request with empty body',
  MISSING_TASK_TITLE: 'Task Title is missing',
  TASK_TITLE_NOT_A_STRING: 'Task Title is not a string',
  EMPTY_TASK_TITLE: 'Task Title is empty string',
  MISSING_TASK_DESCRIPTION: 'Task Description is missing',
  TASK_DESCRIPTION_NOT_A_STRING: 'Task Description is not a string',
  EMPTY_TASK_DESCRIPTION: 'Task Description is empty string',
  MISSING_CREATION_DATE: 'Creation date is missing',
  CREATION_DATE_NOT_A_STRING: 'Creation Date is not a string',
  EMPTY_CREATION_DATE: 'Creation Date is empty string',
  MISSING_DUE_DATE: 'Expected date is missing',
  DUE_DATE_NOT_A_STRING: 'Expected date is not a string',
  EMPTY_DUE_DATE: 'Expected date is empty string',
  DUE_DATE_EXPIRED: 'You are trying to set Due Date, which is already expired',
  CATEGORY_ERROR: 'Please revise you category and choose one form the list'
};
