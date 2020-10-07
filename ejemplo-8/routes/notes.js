const express = require('express');
const router = express.Router();
const sequelize = require('../database');

// Callback para mostrar todas las notas
router.get('/', async (req, res) => {
  const notes = await sequelize.models.Notes.findAll(); // Obtener todas las notas de la base de datos
  return res.json(notes);
})

// Callback para crear una nueva nota
router.post('/', async (req, res) => {
  const { body } = req; // Obteniendo la información desde la solicitud
  const Note = await sequelize.models.Notes.create({
    heading: body.heading,
    content: body.content,
  });
  Note.save(); // Guardamos en la base de datos
  return res.json({ message: 'Nota creada correctamente' });
});

// Callback para actualizar una nota
router.put('/:id', async (req, res) => {
  const { body, params: { id } } = req;
  const Note = await sequelize.models.Notes.findOne({ where: { id } }); // Buscar el element a través del id
  if (!Note) {w
    return res.status(404).json({ message: 'Nota no encontrada' })
  }
  const updatedNote = await Note.update({
    heading: body.heading,
    content: body.content,
  })
  return res.json({ message: 'Nota actualizada', data: updatedNote })
});

// Callback para eliminar una nota
router.delete('/:id', async (req, res) => {
  const { params: { id } } = req;
  const Note = await sequelize.models.Notes.findOne({ where: { id }}); // Buscar el element a través del id
  if (!Note) {
    return res.status(404).json({ message: 'Nota no encontrada' })
  }
  await Note.destroy(); // Elimina el recurso de la base de datos
  return res.json({ message: 'Nota eliminada' });
});

module.exports = router;