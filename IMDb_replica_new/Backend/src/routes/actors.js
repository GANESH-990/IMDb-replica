const express = require('express');
const { getActors } = require('../controller/actors');
const router = express();

router.get('/actors', getActors);

module.exports = router;