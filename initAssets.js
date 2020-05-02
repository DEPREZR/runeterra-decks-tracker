const wget = require("wget-improved");
const fs = require("fs");
const unzipper = require("unzipper");
const sharp = require("sharp");

fs.rmdirSync("./app/assets", { recursive: true });
console.log("assets dir removed");
fs.rmdirSync("./app/img", { recursive: true });
console.log("img dir removed");
fs.mkdirSync("./app/img");

let download = wget.download(
  "https://dd.b.pvp.net/latest/core-fr_fr.zip",
  "./datadragon-core-fr_fr.zip"
);
let download2 = wget.download(
  "https://dd.b.pvp.net/latest/set1-lite-fr_fr.zip",
  "./datadragon-set1-lite-fr_fr.zip"
);

let download3 = wget.download(
  "https://dd.b.pvp.net/latest/set2-lite-fr_fr.zip",
  "./datadragon-set2-lite-fr_fr.zip"
);

download.on("end", function(output) {
  console.log("dl core done");
  fs.createReadStream("./datadragon-core-fr_fr.zip")
    .pipe(unzipper.Extract({ path: "./app/assets/datadragon-core-fr_fr" }))
    .promise()
    .then(() => {
      console.log("unzip core done");
      fs.unlink("./datadragon-core-fr_fr.zip", () => {
        console.log("datadragon-core-fr_fr.zip removed");
      });
    });
});

download2.on("end", function(output) {
  console.log("dl set1 done");
  fs.createReadStream("./datadragon-set1-lite-fr_fr.zip")
    .pipe(unzipper.Extract({ path: "./app/assets/datadragon-set1-lite-fr_fr" }))
    .promise()
    .then(() => {
      console.log("unzip set1 done");
      fs.unlink("./datadragon-set1-lite-fr_fr.zip", () => {
        console.log("datadragon-set1-lite-fr_fr.zip removed");
      });
      fs.readdir(
        "./app/assets/datadragon-set1-lite-fr_fr/fr_fr/img/cards",
        (err, files) => {
          const promises = [];
          files.forEach(file => {
            promises.push(
              sharp(
                `./app/assets/datadragon-set1-lite-fr_fr/fr_fr/img/cards/${file}`
              )
                .png({ quality: 30 })
                .resize({ width: 180 })
                .toFile(`./app/img/${file}`)
            );
          });

          Promise.all(promises).then(() => {
            console.log("resizing done");
            fs.rmdirSync(
              "./app/assets/datadragon-set1-lite-fr_fr/fr_fr/img/cards",
              { recursive: true }
            );
            console.log("removing /cards done");
          });
        }
      );
    });
});

download3.on("end", function(output) {
  console.log("dl set2 done");
  fs.createReadStream("./datadragon-set2-lite-fr_fr.zip")
    .pipe(unzipper.Extract({ path: "./app/assets/datadragon-set2-lite-fr_fr" }))
    .promise()
    .then(() => {
      console.log("unzip set2 done");
      fs.unlink("./datadragon-set2-lite-fr_fr.zip", () => {
        console.log("datadragon-set2-lite-fr_fr.zip removed");
      });
      fs.readdir(
        "./app/assets/datadragon-set2-lite-fr_fr/fr_fr/img/cards",
        (err, files) => {
          const promises = [];
          files.forEach(file => {
            promises.push(
              sharp(
                `./app/assets/datadragon-set2-lite-fr_fr/fr_fr/img/cards/${file}`
              )
                .png({ quality: 30 })
                .resize({ width: 180 })
                .toFile(`./app/img/${file}`)
            );
          });

          Promise.all(promises).then(() => {
            console.log("resizing done");
            fs.rmdirSync(
              "./app/assets/datadragon-set2-lite-fr_fr/fr_fr/img/cards",
              { recursive: true }
            );
            console.log("removing /cards done");
          });
        }
      );
    });
});
