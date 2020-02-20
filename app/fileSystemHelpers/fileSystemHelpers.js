const electron = require("electron");
const fs = require("fs");
const path = require("path");

export const getData = () => {
  try {
    const userDataPath = (electron.app || electron.remote.app).getPath(
      "userData"
    );
    let data = fs.readFileSync(path.join(userDataPath, `data.json`));

    return JSON.parse(data);
  } catch (err) {
    return undefined;
  }
};

export const writeData = data => {
  const userDataPath = (electron.app || electron.remote.app).getPath(
    "userData"
  );
  fs.writeFileSync(path.join(userDataPath, `data.json`), JSON.stringify(data));
};
