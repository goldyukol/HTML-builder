const { stdin, stdout, exit } = require('process');
const { join } = require('path');
const { writeFile } = require('fs');

let writeData = '';

const EXIT_LETTER = 'exit';

const bye = () => console.log('Have a nice day! Bye!');

stdout.write('Let\'s write \n');
stdin.on('data', (data) => {
  if (data.toString().slice(0, 4) === EXIT_LETTER) {
    bye();
    exit(0);
  }
  writeData += data.toString();
  writeFile(join(__dirname, 'text.txt'), writeData, (error) => {
    if (error) console.warn(error);
  });
});

process.on('SIGINT', () => {
  bye();
  exit(0);
});
