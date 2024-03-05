import timings from "@/data/timings.json";
import { TimingKeys } from "@/types";

export class Settings {
  static get method(): string {
    return localStorage.getItem("settings-timing") ?? Object.keys(timings)[0];
  }
  static set method(value) {
    localStorage.setItem("settings-timing", value);
  }

  static get methodLabel(): string {
    if (Settings.isUsingCustomMethod) {
      return timings[Settings.method as TimingKeys].name;
    }
    return "";
  }

  static get offset(): number {
    return parseInt(localStorage.getItem("settings-offset") ?? "0");
  }

  static set offset(value: string | number) {
    localStorage.setItem("settings-offset", value.toString());
  }

  static get offsetLabel(): string {
    if (Settings.isUsingCustomMethod) {
      return (
        timings[Settings.method as TimingKeys].offsets.find(
          (offset) => offset.offset === Settings.offset,
        )?.name ?? ""
      );
    }
    return "";
  }

  static get methods(): { [key: string]: string } {
    const timingsFromData = Object.fromEntries(
      Object.entries(timings).map(([key, value]) => [key, value.name]),
    );

    return timingsFromData;
  }

  static get timings() {
    return timings[Settings.method as TimingKeys].timings;
  }

  static get isUsingCustomMethod(): boolean {
    return Object.keys(timings).includes(Settings.method);
  }

  static get offsets(): { [key: number]: string } {
    return Object.fromEntries(
      timings[Settings.method as TimingKeys].offsets.map((offset) => [
        offset.offset,
        offset.name,
      ]),
    );
  }
}
