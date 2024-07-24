const express = require('express');
const router = express.Router();
const excerciseController = require('../controller/excerciseController');


router.post('/:_id/exercises', excerciseController.createExercise);



router.get('/logs', excerciseController.getLogs);

module.exports = router;