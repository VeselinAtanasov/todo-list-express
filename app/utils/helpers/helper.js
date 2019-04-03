const constants = require('./constants');

function getCurrentDate () {
  var time = new Date();
  function fill (digit) {
    if (digit >= 0 && digit < 10) {
      return '0' + digit;
    }
    return '' + digit;
  }

  return ('' + time.getFullYear() + '-' + fill(time.getMonth() + 1) + '-' + fill(time.getDate()) + ' ' + fill(time.getHours()) + ':' + fill(time.getMinutes()) + ':' + fill(time.getSeconds()));
}
function getCurrentDayWithoutHours () {
  return new Date().toISOString().slice(0, 10);
}
function isExpired (expectedDate, creationDate) {
  let dueDate = Date.parse(expectedDate);
  let dayOfCreation = Date.parse(creationDate);
  let dayDifference = Math.ceil((dueDate - dayOfCreation) / (1000 * 3600 * 24));
  if (dayDifference < 0) {
    return true;
  }
  return false;
}
function getDayDifference (expectedDate, creationDate) {
  let dueDate = Date.parse(expectedDate);
  let dayOfCreation = Date.parse(creationDate);
  return Math.ceil((dueDate - dayOfCreation) / (1000 * 3600 * 24));
}
function validateAndGetTaskParams (params) {
  if (!params) {
    throw new Error(constants.MISSING_PARAMS);
  }
  if (!params['taskTitle']) {
    throw new Error(constants.MISSING_TASK_TITLE);
  }
  if (typeof params['taskTitle'] !== 'string') {
    throw new Error(constants.TASK_TITLE_NOT_A_STRING);
  }
  if (params['taskTitle'].length === 0) {
    throw new Error(constants.EMPTY_TASK_TITLE);
  }
  if (!params['taskDescription']) {
    throw new Error(constants.MISSING_TASK_DESCRIPTION);
  }
  if (typeof params['taskDescription'] !== 'string') {
    throw new Error(constants.TASK_DESCRIPTION_NOT_A_STRING);
  }
  if (params['taskDescription'].length === 0) {
    throw new Error(constants.EMPTY_TASK_DESCRIPTION);
  }
  if (!params['creationDate']) {
    throw new Error(constants.MISSING_CREATION_DATE);
  }
  if (typeof params['creationDate'] !== 'string') {
    throw new Error(constants.CREATION_DATE_NOT_A_STRING);
  }
  if (params['creationDate'].length === 0) {
    throw new Error(constants.EMPTY_CREATION_DATE);
  }
  if (!params['category'] || typeof params['category'] !== 'string' || params['category'].length === 0) {
    throw new Error(constants.CATEGORY_ERROR);
  }
  if (!params['expectedDay']) {
    throw new Error(constants.MISSING_DUE_DATE);
  }
  if (typeof params['expectedDay'] !== 'string') {
    throw new Error(constants.DUE_DATE_NOT_A_STRING);
  }
  if (params['expectedDay'].length === 0) {
    throw new Error(constants.EMPTY_DUE_DATE);
  }
  if (isExpired(params['expectedDay'], params['creationDate'])) {
    throw new Error(constants.DUE_DATE_EXPIRED);
  }
  if (params['status'] !== 'open') {
    params['status'] = 'closed';
  }
  return {
    taskTitle: params.taskTitle,
    expectedDay: params.expectedDay,
    taskDescription: params.taskDescription,
    creationDate: params.creationDate,
    category: params.category,
    status: params.status
  };
}
function getRouteByCategory (params) {
  if (params && params.category) {
    let category = params.category;
    switch (category) {
      case constants.categories.OTHER:
        return constants.categories.OTHER;
      case constants.categories.ALL:
        return constants.categories.ALL;
      case constants.categories.PERSONAL:
        return constants.categories.PERSONAL;
      case constants.categories.WORK:
        return constants.categories.WORK;
      default:
        return constants.categories.ALL;
    }
  }
  return constants.categories.ALL;
}
function filterTasksByCategory (params, filter, closed) {
  let data = params;
  if (filter !== constants.categories.ALL) {
    data = params.filter((a, b) => a.category === filter);
  }

  if (!closed) {
    data = data.filter((a, b) => a.status !== constants.STATUS_CLOSED);
  }
  if (closed) {
    data = data.filter((a, b) => a.status === constants.STATUS_CLOSED);
  }
  data.forEach(e => {
    let days = getDayDifference(e.expectedDay, getCurrentDayWithoutHours());
    if (days >= 0) {
      e.isOnTime = true;
      e.customCSS = constants.cssConstants.CSS_GREEN_BOX;
    } else {
      e.isOnTime = false;
      e.customCSS = constants.cssConstants.CSS_RED_BOX;
    }
    if (e.status === constants.STATUS_CLOSED) {
      e.customCSS = constants.cssConstants.CSS_CLOSED;
    }
    e.days = days;
  });
  let tasks = data.sort((a, b) => a.days - b.days);
  tasks.forEach(e => {
    let days = getDayDifference(e.expectedDay, getCurrentDayWithoutHours());
    e.days = Math.abs(days);
  });
  return tasks;
}

module.exports = {
  getCurrentDate,
  getCurrentDayWithoutHours,
  validateAndGetTaskParams,
  getDayDifference,
  getRouteByCategory,
  filterTasksByCategory
};
