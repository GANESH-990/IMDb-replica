const express = require('express');
const { signup, signin, signout} = require('../controller/user');
const router = express.Router();

router.post('/signup', signup);

router.post('/signin', signin);

router.post('/signout', signout);

module.exports = router;