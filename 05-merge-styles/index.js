const { readdir, readFile, writeFile } = require('fs/promises');
const { join, parse } = require('path');

const GOAL_DIR = join(__dirname, 'styles');
const PROJECT_DIST_DIR = join(__dirname, 'project-dist', 'bundle.css');

const mergeStyles = async () => {
  try {
    let cssData = [];

    const files = await readdir(GOAL_DIR);
    const cssOnlyFiles = files.filter(
      (fileItem) => parse(fileItem).ext === '.css'
    );

    cssOnlyFiles.forEach(async (fileItem, i) => {
      let filePath = join(GOAL_DIR, fileItem);

      const content = await readFile(filePath);
      cssData[i] = content.toString();

      await writeFile(PROJECT_DIST_DIR, cssData.join(''));
    });
  } catch (error) {
    console.warn(error);
  }
};

mergeStyles();
