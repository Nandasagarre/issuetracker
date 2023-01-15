const express = require('express');
const homeController = require('../controllers/homeController')
const routes = express.Router();

routes.get('/', homeController.showHome);
routes.get('/create', homeController.showCreateProject);
routes.get('/fetchproject/:id/createbug', homeController.showCreateBug)
routes.get('/fetchproject/:id', homeController.getPrpjectDetails);

//post calls create projsct and bug
routes.post('/createproject', homeController.createProject);
routes.post('/fetchproject/:id/createbug', homeController.createBug)



module.exports = routes;