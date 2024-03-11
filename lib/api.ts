const { loadEnvConfig } = require("@next/env");
const fs = require("fs");
loadEnvConfig(process.cwd());

async function getTimingsData() {
  const API_URL = process.env.API_URL;
  const EXTRA_DATA_URL = process.env.EXTRA_DATA_URL;

  if (!API_URL) throw "API URL not found!";
  if (!EXTRA_DATA_URL) throw "API URL not found!";

  fs.rmSync("data", {
    recursive: true,
    force: true,
  });

  fs.mkdirSync("data");
  const timingsData = await fetch(API_URL)
    .then((response) => response.json())
    .then((data) => data);
  const extraData = await fetch(EXTRA_DATA_URL)
    .then((response) => response.json())
    .then((data) => data);
  fs.writeFile(
    "data/timings.json",
    JSON.stringify({
      ...timingsData["data"],
      ...extraData["data"],
    }),
    null,
    () => {},
  );
}

getTimingsData();
