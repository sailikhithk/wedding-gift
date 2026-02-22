const fs = require("fs");
const https = require("https");

const url =
  "https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/shoe-prints.svg";
const file = fs.createWriteStream("public/images/marauders-footprints.svg");

https
  .get(url, function (response) {
    response.pipe(file);
    file.on("finish", () => {
      file.close();
      console.log("Download Completed");
    });
  })
  .on("error", (err) => {
    fs.unlink("public/images/marauders-footprints.svg", () => {});
    console.log("Error: " + err.message);
  });
