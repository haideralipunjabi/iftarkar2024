const { loadEnvConfig } = require("@next/env");
const fs = require("fs");
loadEnvConfig(process.cwd());

function getTimingsData() {
  const API_URL = process.env.API_URL;
  if (!API_URL) throw "API URL not found!";
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      fs.writeFile(
        "data/timings.json",
        JSON.stringify(data["data"]),
        null,
        () => {},
      );
    });
}

getTimingsData();
