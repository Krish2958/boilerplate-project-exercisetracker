const express = require('express');
const router = express.Router();

const userController = require('../controller/usercontroller');

const User = require('../models/user');

router.post('/', userController.createUser);

router.get('/', userController.getAllUsers);

module.exports = router;
