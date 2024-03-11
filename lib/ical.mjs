import timings from "../data/timings.json" assert { type: "json" };
import ical from "ical-generator";
import { DateTime, Duration } from "luxon";
import env from "@next/env";
import fs from "fs";

const { loadEnvConfig } = env;
loadEnvConfig(process.cwd());

function generateICalFiles() {
  fs.rmSync("public/ical/", {
    recursive: true,
    force: true,
  });
  fs.mkdirSync("public/ical/");

  const startDate = DateTime.fromFormat(
    process.env.NEXT_PUBLIC_RAMADAN_START_DATE,
    "yyyy-MM-dd",
  );
  for (let methodName of Object.keys(timings)) {
    let method = timings[methodName];
    let offsets = method.offsets;
    offsets.push({
      offset: 0,
    });
    for (let offset of method.offsets) {
      const calendar = ical({ name: `${method.name}-${offset}` });
      for (let i = 0; i < 30; i++) {
        const currDate = startDate.plus(Duration.fromObject({ day: i }));
        const label = currDate.toFormat("ddLL");
        const timing = method.timings[label];

        const sehri = DateTime.fromFormat(
          `${timing.fajr} ${label}`,
          "H:mm ddLL",
        )
          .plus(Duration.fromObject({ minutes: offset.offset }))
          .setZone("Asia/Calcutta");
        const iftar = DateTime.fromFormat(
          `${timing.maghrib} ${label}`,
          "H:mm ddLL",
        )
          .plus(Duration.fromObject({ minutes: offset.offset }))
          .setZone("Asia/Calcutta");

        calendar.createEvent({
          start: iftar,
          summary: "Iftar",
          url: "https://namazpar.com",
        });
        calendar.createEvent({
          start: sehri,
          summary: "Sehri",
          url: "https://namazpar.com",
        });
      }
      fs.writeFile(
        `public/ical/${method.name}-${offset.offset}.ics`,
        calendar.toString(),
        null,
        () => {},
      );
    }
  }
}

generateICalFiles();
