/**
 * Prebuild script — fetches prayer timings from the Al Adhan API
 * and writes `data/timings.json` in the format expected by the app.
 *
 * Coordinates: Srinagar, Kashmir (34.0837°N, 74.7973°E)
 *
 * Usage:  npx ts-node lib/api.ts          (runs automatically via `npm run prebuild`)
 */

const fs = require("fs");

// ── Srinagar coordinates ──────────────────────────────────────────
const LATITUDE = 34.0837;
const LONGITUDE = 74.7973;

// ── Ramadan 2026 spans parts of Feb and March ─────────────────────
const MONTHS_TO_FETCH = [
  { year: 2026, month: 1 },
  { year: 2026, month: 2 },
  { year: 2026, month: 3 },
  { year: 2026, month: 4 },
];

// ── Calculation methods from Al Adhan API ─────────────────────────
// Each "method" in the app corresponds to a different local calendar.
// We map each to an Al Adhan method id for the closest match.
// See: https://aladhan.com/prayer-times-api  (method parameter docs)
//
//   1 = University of Islamic Sciences, Karachi (Hanafi)
//   2 = Islamic Society of North America
//   3 = Muslim World League
//   4 = Umm Al-Qura University, Makkah
//   5 = Egyptian General Authority of Survey
//   7 = Institute of Geophysics, University of Tehran (Jafari / Shia)
//  11 = Majlis Ugama Islam Singapura
//  99 = Custom (you can pass custom fajr/isha angles)
//
// The original app had these methods:
//   raheemiya  → Fiqah Hanafiya   → method=1 (Karachi, closest Hanafi)
//   etk        → Fiqah Jaffaria   → method=7 (Tehran / Shia Ithna-Ashari)
//   ahlehadees → Ahle Hadees      → method=3 (MWL, commonly used by salafi orgs)
//   tsajk      → TSAJK Calendar   → method=1 (Hanafi)
//   ajksa      → AJKSA Calendar   → method=1 (Hanafi)

interface MethodConfig {
  name: string;
  aladhanMethod: number;
  offsets: { name: string; offset: number }[];
}

const METHOD_CONFIGS: Record<string, MethodConfig> = {
  raheemiya: {
    name: "Raheemiya Calendar",
    aladhanMethod: 1,
    offsets: [
      { name: "Budgam", offset: -2 },
      { name: "Baramulla", offset: -5 },
      { name: "Kupwara", offset: -7 },
      { name: "Bandipora", offset: -3 },
      { name: "Ganderbal", offset: -1 },
      { name: "Pulwama", offset: 2 },
      { name: "Shopian", offset: 3 },
      { name: "Kulgam", offset: 4 },
      { name: "Anantnag", offset: 3 },
    ],
  },
  etk: {
    name: "ETK Calendar",
    aladhanMethod: 7,
    offsets: [
      { name: "Budgam", offset: -2 },
      { name: "Baramulla", offset: -5 },
      { name: "Kupwara", offset: -7 },
      { name: "Bandipora", offset: -3 },
      { name: "Ganderbal", offset: -1 },
      { name: "Pulwama", offset: 2 },
      { name: "Shopian", offset: 3 },
      { name: "Kulgam", offset: 4 },
      { name: "Anantnag", offset: 3 },
    ],
  },
  ahlehadees: {
    name: "Ahle Hadees Calendar",
    aladhanMethod: 3,
    offsets: [
      { name: "Budgam", offset: -2 },
      { name: "Baramulla", offset: -5 },
      { name: "Kupwara", offset: -7 },
      { name: "Bandipora", offset: -3 },
      { name: "Ganderbal", offset: -1 },
      { name: "Pulwama", offset: 2 },
      { name: "Shopian", offset: 3 },
      { name: "Kulgam", offset: 4 },
      { name: "Anantnag", offset: 3 },
    ],
  },
  tsajk: {
    name: "TSAJK Calendar",
    aladhanMethod: 1,
    offsets: [{ name: "Anantnag", offset: 3 }],
  },
  ajksa: {
    name: "AJKSA Calendar",
    aladhanMethod: 1,
    offsets: [],
  },
};

// ── Helpers ───────────────────────────────────────────────────────

/** Strip timezone suffix like " (IST)" from an Al Adhan time string */
function cleanTime(raw: string): string {
  return raw.replace(/\s*\(.*\)$/, "");
}

/** Convert "HH:mm" → "H:mm" (drop leading zero on the hour) */
function toHmm(time: string): string {
  const [h, m] = time.split(":");
  return `${parseInt(h, 10)}:${m}`;
}

/** Pad a number to two digits */
function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

async function fetchMonthTimings(
  year: number,
  month: number,
  method: number,
): Promise<Record<string, { fajr: string; maghrib: string }>> {
  const url =
    `https://api.aladhan.com/v1/calendar/${year}/${month}` +
    `?latitude=${LATITUDE}&longitude=${LONGITUDE}&method=${method}`;

  console.log(`  Fetching ${url}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const json = await res.json();

  const result: Record<string, { fajr: string; maghrib: string }> = {};

  for (const day of json.data) {
    const greg = day.date.gregorian;
    const key = `${pad(parseInt(greg.day))}${pad(parseInt(greg.month.number))}`;
    result[key] = {
      fajr: toHmm(cleanTime(day.timings.Fajr)),
      maghrib: toHmm(cleanTime(day.timings.Maghrib)),
    };
  }

  return result;
}

// ── Main ──────────────────────────────────────────────────────────

async function main() {
  console.log("🕌 Fetching prayer timings from Al Adhan API...\n");

  // Remove & recreate data/
  fs.rmSync("data", { recursive: true, force: true });
  fs.mkdirSync("data");

  const finalData: Record<string, any> = {};

  for (const [key, config] of Object.entries(METHOD_CONFIGS)) {
    console.log(`▸ Method: ${key} (Al Adhan method=${config.aladhanMethod})`);

    let allTimings: Record<string, { fajr: string; maghrib: string }> = {};

    for (const { year, month } of MONTHS_TO_FETCH) {
      const monthTimings = await fetchMonthTimings(
        year,
        month,
        config.aladhanMethod,
      );
      allTimings = { ...allTimings, ...monthTimings };
    }

    finalData[key] = {
      name: config.name,
      offsets: config.offsets,
      timings: allTimings,
    };

    console.log(
      `  ✓ ${Object.keys(allTimings).length} days fetched for ${key}\n`,
    );
  }

  const outPath = "data/timings.json";
  fs.writeFileSync(outPath, JSON.stringify(finalData, null, 2));
  console.log(`✅ Written to ${outPath}`);
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
