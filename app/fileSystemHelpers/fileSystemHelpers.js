const fs = require("fs");

export const getData = () => {
  try {
    let data = fs.readFileSync(`data.json`);

    return JSON.parse(data);
  } catch (err) {
    return undefined;
  }
};

export const writeData = data => {
  fs.writeFileSync(`data.json`, JSON.stringify(data));
};
