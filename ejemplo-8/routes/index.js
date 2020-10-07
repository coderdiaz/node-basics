const express = require('express');
const router = express.Router();

// Aquí voy a definir los paths
router.use('/notes', require('./notes'));

module.exports = router;