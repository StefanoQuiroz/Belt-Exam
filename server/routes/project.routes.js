const express = require('express');
const router = express();
const {findProject, findSingleProject, createProject, updateProject, deleteProject} = require('../controllers/project.controllers')
const { authenticate } = require('../config/jwt.config');

router.get(`/project`, findProject);
router.get(`/project/:id`, findSingleProject);
router.post(`/project/new`, createProject);
router.put(`/project/update/:id`, updateProject);
router.delete(`/project/delete/:id`, deleteProject);

module.exports = router;