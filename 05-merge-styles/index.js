const { readdir, readFile, writeFile } = require('fs/promises');
const { join, parse } = require('path');

const GOAL_DIR = join(__dirname, 'styles');

const mergeStyles = async () => {
  let cssData = [];

  const files = await readdir(GOAL_DIR);

  let cssOnlyFiles = files.filter((file) => parse(file).ext === '.css');

  cssOnlyFiles.forEach(async (fileItem, index) => {
    let filePath = join(GOAL_DIR, fileItem);

    const content = await readFile(filePath);
    cssData[index] = content.toString();

    if (cssData.length === cssOnlyFiles.length && !cssData.includes(undefined))
      await writeFile(
        join(__dirname, 'project-dist', 'bundle.css'),
        cssData.join('')
      );
  });
};

mergeStyles();