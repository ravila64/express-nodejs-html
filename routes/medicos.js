const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataFilePath = path.join(__dirname, '../db/datos.json');

// Función para leer los datos desde el archivo datos.json
const readData = () => {
  const data = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(data);
};

// Función para escribir los datos al archivo datos.json
const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Obtener todos los usuarios
router.get('/', (req, res) => {
  const users = readData();
  res.json(users);
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).send('Nombre y email son requeridos');
  }

  const users = readData();

  const newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    name,
    email
  };

  users.push(newUser);
  writeData(users);

  res.status(201).json(newUser);
});

// Actualizar un usuario
router.put('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;

  const users = readData();
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).send('Usuario no encontrado');
  }

  // Actualizar los campos si se han enviado
  user.name = name || user.name;
  user.email = email || user.email;

  writeData(users);

  res.json(user);
});

// Eliminar un usuario
router.delete('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  let users = readData();

  const updatedUsers = users.filter(user => user.id !== userId);

  if (users.length === updatedUsers.length) {
    return res.status(404).send('Usuario no encontrado');
  }

  writeData(updatedUsers);
  res.status(204).send();
});

module.exports = router;