const router = require('express').Router();
const userRoutes = require('./userRoutes');
const profileRoutes = require('./profileRoutes');
const matchRoutes = require('./userRoutes')

router.use('/users', userRoutes);
router.use('/profiles', profileRoutes);

router.use('/matches', matchRoutes )

module.exports = router;
