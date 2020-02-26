export const CLIENT_IP = "127.0.0.1";
export const regionsBackgroundColors = {
  Noxus: "linear-gradient(90deg, rgb(207, 168, 167), rgb(160, 82, 79))",
  Demacia: "linear-gradient(90deg, rgb(223, 215, 193), rgb(191, 176, 131))",
  Freljord: "linear-gradient(90deg, rgb(172, 219, 236), rgb(90, 184, 218))",
  ShadowIsles: "linear-gradient(90deg, rgb(157, 190, 183), rgb(59, 125, 111))",
  Ionia: "linear-gradient(90deg, rgb(231, 192, 205), rgb(207, 130, 155))",
  PiltoverZaun: "linear-gradient(90deg, rgb(240, 207, 186), rgb(226, 159, 118))"
};

const importAll = require =>
  require.keys().reduce((acc, next) => {
    acc[next.replace("./", "")] = require(next);
    return acc;
  }, {});

export const images = importAll(require.context("./img", false, /\.png$/));
