const express = require('express');
const path = require('path');
//const usersRouter = require('./routes/users');
const usersRouter = require('./routes/medicos');

const app = express();
const port = 3000;

// Middleware para manejar JSON
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Usar las rutas de usuarios
app.use('/users', usersRouter);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
