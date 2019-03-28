const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const fileUpLoader = require('express-fileupload');

module.exports = (app) => {
  app.engine('hbs', handlebars({
    extname: '.hbs',
    layoutsDir: 'views/layouts',
    defaultLayout: 'main'
  }));
  app.set('view engine', 'hbs');

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(fileUpLoader());

  app.use((req, res, next) => {
    if (req.user) {
      res.locals.currentUser = req.user;
    }
    next();
  });
  app.use('/static', express.static('static'));

  console.log('Express ready!');
};
