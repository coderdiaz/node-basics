const inquirer = require('inquirer');

inquirer
  .prompt([
    { type: "input", name: 'whois', message: "Quién eres?"},
    { type: 'checkbox', name: 'gender', message: 'Escoge tu género', choices: ['Masculino', 'Femenino'] }
  ]).then(answers => {
    console.log(answers);
  }).catch(err => {
    console.log(err);
    if(err.isTtyError) throw err;
    console.error('Algo paso mal');
  })