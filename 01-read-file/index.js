const { createReadStream } = require('fs');
const { join } = require('path');
const { stdout } = require('process');

createReadStream(join(__dirname, 'text.txt'))
  .pipe(stdout)
  .on('error', (err) => console.warn('Error with read stream', err));
