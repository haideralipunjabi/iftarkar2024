import { Settings } from "./settings";
import { DateTime, Duration } from "luxon";
import { DayLabel, TimingKeys } from "@/types";
import timings from "@/data/timings.json";
export function getTimes() {
  const now = DateTime.now();
  const oneDayDuration = Duration.fromObject({ day: 1 });
  const today = now.toFormat("ddLL") as DayLabel;
  const yesterday = now.minus(oneDayDuration).toFormat("ddLL") as DayLabel;
  const tomorrow = now.plus(oneDayDuration).toFormat("ddLL") as DayLabel;
  const timingsToday = Settings.timings[today];
  const timingsTomorrow = Settings.timings[tomorrow];
  const timingsYesterday = Settings.timings[yesterday];
  const offset = Duration.fromObject({ minute: Settings.offset });
  const sehriToday = DateTime.fromFormat(timingsToday.fajr, "H:mm").plus(
    offset,
  );
  const iftarToday = DateTime.fromFormat(timingsToday.maghrib, "H:mm").plus(
    offset,
  );
  const sehriTomorrow = DateTime.fromFormat(timingsTomorrow.fajr, "H:mm")
    .plus(oneDayDuration)
    .plus(offset);
  const iftarYesterday = DateTime.fromFormat(timingsYesterday.maghrib, "H:mm")
    .minus(oneDayDuration)
    .plus(offset);

  if (now <= sehriToday)
    return {
      previous: iftarYesterday,
      next: sehriToday,
      label: "Sehri",
    };
  if (now <= iftarToday)
    return {
      previous: sehriToday,
      next: iftarToday,
      label: "Iftar",
    };
  return {
    previous: iftarToday,
    next: sehriTomorrow,
    label: "Sehri",
  };
}

export function getIftarSehriForDate(date: DateTime, method: TimingKeys) {
  const label = date.toFormat("ddLL") as DayLabel;
  const timing = timings[method].timings[label];
  return {
    sehri: DateTime.fromFormat(timing.fajr, "H:mm"),
    iftar: DateTime.fromFormat(timing.maghrib, "H:mm"),
  };
}

export const getIslamicDate = () => {
  const systemOffset = parseInt(
    process.env.NEXT_PUBLIC_SYSTEM_HIJRI_DATE_OFFSET ?? "0",
  );
  const { iftar } = getIftarSehriForDate(
    DateTime.now(),
    Settings.method as TimingKeys,
  );
  const extraOffset = DateTime.now() > iftar ? 1 : 0;
  return new Intl.DateTimeFormat("en-IN-u-ca-islamic", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(
    DateTime.now()
      .plus(
        Duration.fromObject({
          days: Settings.hijriOffset + systemOffset + extraOffset,
        }),
      )
      .toJSDate(),
  ).replace("BC","AH");
};

export const arrayRange = (start: number, stop: number, step: number) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step,
  );

export const getLabel = (method: string) => {
  if (method === "raheemiya")
    return `Fiqah Hanafiya (${timings[method as TimingKeys].name})`;
  if (method === "etk")
    return `Fiqah Jaffaria (${timings[method as TimingKeys].name})`;
  return timings[method as TimingKeys].name;
};
