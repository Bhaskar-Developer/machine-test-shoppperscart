const path = require('path');
const express = require('express');
const hbs = require('hbs');
const errorHandler = require('../src/middlewares/error');

//Define Paths for Express Configuration
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, '../templates/views');
const partialsDirectoryPath = path.join(__dirname, '../templates/partials');

// Import Routes Files
const category = require('../src/routes/categoryRoutes');

module.exports = () => {
  const app = express();

  //Website Maintainance Code
  // app.use((req, res) => {
  //   res.render('maintain', {
  //     title: 'ShoppersCart',
  //     name: 'Bhaskar Chetty',
  //     message: 'Website is under maintenance. Come back later!'
  //   })
  // })

  //Use handle bars view engine
  app.set('view engine', 'hbs');
  app.set('views', viewsDirectoryPath);
  hbs.registerPartials(partialsDirectoryPath);

  //Set up static directory to be served
  app.use(express.static(publicDirectoryPath));

  app.use(express.json());

  // Mount Routes
  app.use('/api/v1/category', category);

  // Use Custom Error Handler
  app.use(errorHandler);

  //Categories Page - Home Page
  app.get('', (req, res) => {
    res.render('categories', {
      title: 'Categories',
      name: 'Bhaskar Chetty',
    });
  });

  //404 - Page
  app.get('*', (req, res) => {
    res.render('404', {
      title: '404',
      name: 'Bhaskar Chetty',
      message: 'Page Not Found',
    });
  });

  return app;
};
