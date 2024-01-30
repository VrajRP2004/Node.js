// ep 103
const express = require('express')
const authController = require('./../Controllers/authController')
const router = express.Router();

router.route('/signup').post(authController.signup);

// ep 107
router.route('/login').post(authController.login);

// ep 103
module.exports = router ; 