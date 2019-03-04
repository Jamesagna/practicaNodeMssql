var express = require("express");
var EstudiantesController = require('../controller/estudiantes')

const router = express.Router()

router.route('/')
    .get(EstudiantesController.estudiantes)
    .post(EstudiantesController.addEstudiante)
router.route('/:id')
    .get(EstudiantesController.estudiantesByID)
    .put(EstudiantesController.modEstudiante)
    .delete(EstudiantesController.deleteEstudiante)
module.exports = router