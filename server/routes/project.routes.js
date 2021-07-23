const express = require('express');
const router = express();
const {findProject, findSingleProject, createProject, updateProject, deleteProject} = require('../controllers/project.controllers')
const { authenticate } = require('../config/jwt.config');

router.get(`/project/:status`, authenticate, findProject);
router.get(`/project/:id`, authenticate, findSingleProject);
router.post(`/project/new`, authenticate, createProject);
router.put(`/project/update/:id`, authenticate, updateProject);
router.delete(`/project/delete/:id`, authenticate, deleteProject);

module.exports = router;