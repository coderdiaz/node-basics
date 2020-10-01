const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

function crearArchivoUsuario (username, data) {
  // TODO: Validar si el usuario o correo ya esta registrado e indicarlo al usuario.
  fs.writeFile(path.join(__dirname, `./users/${username}.json`), JSON.stringify(data), { encoding: 'utf-8' }, (err) => {
    if (err) throw err;
    console.log('Tu cuenta ha sido registrada: ', username);
  })
}

function crearCuenta () {
  inquirer
    .prompt([
      { name: 'username', message: 'Introduce un nombre de usuario' },
      { name: 'email', message: 'Introduce tu correo electrónico' },
      { type: 'password', name: 'password', message: 'Introduce una contraseña' },
      // TODO: Agregar campo de confirmación de contraseña y validar si coincide con la contraseña ingresada.
    ]).then(answers => {
      crearArchivoUsuario(answers.username, answers);
    });
}

function iniciarSesion () {
  inquirer
    .prompt([
      { name: 'email', message: 'Correo electrónico:' },
      { type: 'password', name: 'password', message: 'Contraseña:' },
    ]).then(answers => {
      fs.readdir(path.join(__dirname, './users'), { encoding: 'utf-8'}, (err, files) => {
        if (err) throw err;
        // TODO: Si el usuario no existe, entonces mostrar al usuario un mensaje indicando el error.
        // Hint: Usarlo dentro de una Promise.
        files.forEach(file => {
          return fs.readFile(path.join(__dirname, `./users/${file}`), { encoding: 'utf-8'}, (err, data) => {
            const info = JSON.parse(data);
            if ((info.email === answers.email) && (info.password === answers.password)) {
              console.log(`✅ Sesión Iniciada: ${info.email}`);
              sesionStarted = true;
              return;
            }
          });
        });
      });
    });
}

// Inicializador
inquirer
  .prompt([
    { type: 'list', name: 'task', message: 'Selecciona una tarea', choices: ['Iniciar Sesión', 'Crear una cuenta'] },
  ]).then(answers => {
    switch(answers.task) {
      case 'Iniciar Sesión':
        iniciarSesion();
        break;
      case 'Crear una cuenta':
        crearCuenta();
        break;
      default:
        console.log('No existe esta funcionalidad');
    }
  }).catch(err => {
    console.log(err);
    if(err.isTtyError) throw err;
    console.error('Algo paso mal');
  })