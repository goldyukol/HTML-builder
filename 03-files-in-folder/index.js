const { readdir, stat } = require('fs/promises');
const { join, parse } = require('path');

const generatePath = (param = '') => join(__dirname, 'secret-folder', param);

readdir(generatePath())
  .then((files) =>
    files.forEach((file) => {
      const { name, ext } = parse(file);

      stat(generatePath(file))
        .then((fileStat) => {
          const { size } = fileStat;

          if (fileStat.isFile()) {
            console.log(`${name} - ${ext.slice(1)} - ${size / 1000}kb`);
          }
        })
        .catch((error) => console.warn(error));
    })
  )
  .catch((error) => console.warn(error));
