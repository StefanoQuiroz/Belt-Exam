const express = require('express');
const router = express();
const {findUser, findSingleUser, createUser, updateUser, deleteUser, login} = require('../controllers/schema.controllers');
const { authenticate } = require('../config/jwt.config');

router.get('/users',authenticate, findUser);
router.get('/users/:id', authenticate, findSingleUser);
router.post('/users/new', createUser);
router.post('/login', login);
router.put('/users/update/:id', authenticate, updateUser);
router.delete('/users/delete/:id', authenticate, deleteUser);


module.exports = router;