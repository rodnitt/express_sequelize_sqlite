const express = require('express');
const user = require('./userRouter.js');
const project = require('./projectRouter.js');
const task = require('./taskRouter.js');

module.exports = app => {
  app.use(
    express.json(),
    user,
    project,
    task
  );
};