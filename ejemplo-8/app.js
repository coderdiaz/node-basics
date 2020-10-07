const express = require('express');
const app = express(); // Creo la aplicación

const APP_PORT = 3001; // Puerto donde será montada la aplicación

// Express body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('/api', require('./routes'));

// Montaje de la aplicación al puerto
app.listen(APP_PORT, () => {
  console.log(`Express on port ${APP_PORT}`);
});