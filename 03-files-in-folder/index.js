const { readdir, stat } = require('fs/promises');
const { join, parse } = require('path');

const generatePath = (param = '') => join(__dirname, 'secret-folder', param);

const getFilesInFolder = async () => {
  try {
    const folderFiles = await readdir(generatePath());

    folderFiles.forEach(async (fileItem) => {
      const { name, ext } = parse(fileItem);

      const fileInfo = await stat(generatePath(fileItem));

      if (fileInfo.isFile()) {
        console.log(`${name} - ${ext.slice(1)} - ${fileInfo.size / 1000}kb`);
      }
    });
  } catch (error) {
    console.warn(error);
  }
};

getFilesInFolder();
