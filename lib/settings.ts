import timings from "@/data/timings.json";
import { TimingKeys } from "@/types";
import { getLabel } from "./utils";

export class Settings {
  static get method(): string {
    if (typeof window == "undefined") return Object.keys(timings)[0];
    return localStorage.getItem("settings-timing") ?? Object.keys(timings)[0];
  }
  static set method(value) {
    localStorage.setItem("settings-timing", value);
  }

  static get methodLabel(): string {
    return getLabel(Settings.method as TimingKeys);
  }

  static get offset(): number {
    if (typeof window == "undefined") return 0;
    return parseInt(localStorage.getItem("settings-offset") ?? "0");
  }

  static set offset(value: string | number) {
    localStorage.setItem("settings-offset", value.toString());
  }

  static get offsetLabel(): string {
    if (Settings.offset === 0) return "Srinagar";
    return (
      timings[Settings.method as TimingKeys].offsets.find(
        (offset) => offset.offset === Settings.offset,
      )?.name ?? ""
    );
  }

  static get methods(): { [key: string]: string } {
    const timingsFromData = Object.fromEntries(
      Object.entries(timings).map(([key]) => [key, getLabel(key)]),
    );

    return timingsFromData;
  }

  static get timings() {
    return timings[Settings.method as TimingKeys].timings;
  }

  static get offsets(): { [key: number]: string } {
    return Object.fromEntries([
      ...[[0, "Srinagar"]],
      ...timings[Settings.method as TimingKeys].offsets.map((offset) => [
        offset.offset,
        offset.name,
      ]),
    ]);
  }

  static get hijriOffset(): number {
    if (typeof window == "undefined") 0;
    return parseInt(localStorage.getItem("settings-hijriOffset") ?? "0");
  }
  static set hijriOffset(value: string | number) {
    localStorage.setItem("settings-hijriOffset", value.toString());
  }
}
