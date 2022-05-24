const { stdin, stdout, exit } = require('process');
const { join } = require('path');
const { writeFile } = require('fs/promises');

let writeData = '';

const EXIT_LETTER = 'exit';

const bye = () => console.log('Have a nice day! Bye!');

stdout.write('Let\'s write \n');
stdin.on('data', async (data) => {
  if (data.toString().slice(0, 4) === EXIT_LETTER) {
    bye();
    exit(0);
  }
  writeData += data.toString();

  try {
    await writeFile(join(__dirname, 'text.txt'), writeData);
  } catch (error) {
    console.warn(error);
  }
});

process.on('SIGINT', () => {
  bye();
  exit(0);
});
