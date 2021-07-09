const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dog = require('./dog')
const dogs = require('./dogs')
const temperament = require('./temperament')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/", dog)
router.use("/", temperament)
router.use("/", dogs)



module.exports = router;
