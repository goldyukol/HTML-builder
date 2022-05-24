const { rm, mkdir, readdir, copyFile } = require('fs/promises');
const { join } = require('path');

const FOLDER_DIR = join(__dirname, 'files');
const FOLDER_DIR_COPY = join(__dirname, 'files-copy');

const startCopyDir = async () => {
  try {
    await rm(FOLDER_DIR_COPY, { recursive: true });
    await updateDir();
  } catch (error) {
    await updateDir();
  }
};

const updateDir = async () => {
  try {
    await mkdir(FOLDER_DIR_COPY);
    const folderFiles = await readdir(FOLDER_DIR);
    folderFiles.forEach(async (fileItem) => {
      await copyFile(
        join(FOLDER_DIR, fileItem),
        join(FOLDER_DIR_COPY, fileItem)
      );
    });
  } catch (error) {
    console.warn(error);
  }
};

startCopyDir();
