const { readdir, readFile, writeFile } = require('fs/promises');
const { join, parse } = require('path');

const GOAL_DIR = join(__dirname, 'styles');

let cssData = [];

readdir(GOAL_DIR)
  .then((files) => {
    const onlyCssFiles = files.filter((file) => parse(file).ext === '.css');

    onlyCssFiles.forEach((file, index) => {
      readFile(join(GOAL_DIR, file))
        .then((fileContent) => {
          cssData[index] = fileContent.toString();

          writeFile(
            join(__dirname, 'project-dist', 'bundle.css'),
            cssData.join('')
          ).catch((error) => console.warn(error));
        })
        .catch((error) => console.warn(error));
    });
  })
  .catch((error) => console.warn(error));
