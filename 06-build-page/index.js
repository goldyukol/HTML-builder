const {
  rm,
  readdir,
  writeFile,
  readFile,
  mkdir,
  stat,
  copyFile,
} = require('fs/promises');

const { join, parse } = require('path');

const GOAL_FOLDER = join(__dirname, 'project-dist');
const STYLES_FOLDER = join(__dirname, 'styles');
const COMPONENTS = join(__dirname, 'components');

const buildPage = async () => {
  try {
    await mkdir(GOAL_FOLDER);

    const data = await readFile(join(__dirname, 'template.html'));
    let convertedData = data.toString();

    const readFiles = await readdir(COMPONENTS);

    readFiles.forEach(async (fileItem) => {
      const fileCont = await readFile(join(COMPONENTS, fileItem));

      convertedData = convertedData.replace(
        `{{${parse(fileItem).name}}}`,
        fileCont.toString()
      );

      writeFile(join(GOAL_FOLDER, 'index.html'), convertedData);
    });

    copyAssets(join(__dirname, 'assets'), join(GOAL_FOLDER, 'assets'));
    makeCss();
  } catch (error) {
    console.warn(error);
  }
};

const makeCss = async () => {
  let cssData = [];

  const files = await readdir(STYLES_FOLDER);

  let cssOnlyFiles = files.filter((fileItem) => parse(fileItem).ext === '.css');

  cssOnlyFiles.forEach(async (fileItem, index) => {
    let filePath = join(STYLES_FOLDER, fileItem);

    const content = await readFile(filePath);
    cssData[index] = content.toString();

    await writeFile(join(GOAL_FOLDER, 'style.css'), cssData.join(''));
  });
};

const makeAssets = async (from, to) => {
  await mkdir(to);
  const files = await readdir(from);

  files.forEach(async (fileItem) => {
    const path = join(from, fileItem);
    const copyPath = join(to, fileItem);

    const info = await stat(path);
    info.isFile() ? copyFile(path, copyPath) : copyAssets(path, copyPath);
  });
};

const copyAssets = async (from, to) => {
  try {
    await rm(to, { recursive: true });
    await makeAssets(from, to);
  } catch (error) {
    await makeAssets(from, to);
  }
};

const startBuild = async () => {
  try {
    await rm(GOAL_FOLDER, { recursive: true });
    await buildPage();
  } catch (error) {
    await buildPage();
  }
};

startBuild();
