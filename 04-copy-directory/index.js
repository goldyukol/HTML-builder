const { rm, mkdir, readdir, copyFile } = require('fs/promises');
const { join } = require('path');

const FOLDER_DIR = join(__dirname, 'files');
const FOLDER_DIR_COPY = join(__dirname, 'files-copy');

const updateDir = () => {
  mkdir(FOLDER_DIR_COPY)
    .then(() => {
      readdir(FOLDER_DIR)
        .then((files) => {
          files.forEach((fileName) => {
            copyFile(
              join(FOLDER_DIR, fileName),
              join(FOLDER_DIR_COPY, fileName)
            ).catch((error) => console.warn(error));
          });
        })
        .catch((error) => console.warn(error));
    })
    .catch((error) => console.warn(error));
};

rm(FOLDER_DIR_COPY, { recursive: true })
  .then(() => updateDir())
  .catch(() => updateDir());
