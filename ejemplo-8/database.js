const { Sequelize } = require('sequelize');

// Importando nuestros modelos
const NoteModel = require('./models/Notes');

// Conexión a la base de datos
const sequelize = new Sequelize('notes-api', 'root', 'root', {
  host: 'localhost',
  dialect: 'mariadb',
  logging: false,
});

// Modelos a agregar
const models = [
  NoteModel,
];

// Registrando los modelos en Sequelize
for (let model of models) {
  model(sequelize);
}

module.exports = sequelize;