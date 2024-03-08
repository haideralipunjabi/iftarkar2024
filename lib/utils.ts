import { Settings } from "./settings";
import { DateTime, Duration } from "luxon";
import { DayLabel } from "@/types";

export function getTimes() {
  const now = DateTime.now();
  const oneDayDuration = Duration.fromObject({ day: 1 });
  const today = now.toFormat("ddLL") as DayLabel;
  const yesterday = now.minus(oneDayDuration).toFormat("ddLL") as DayLabel;
  const tomorrow = now.plus(oneDayDuration).toFormat("ddLL") as DayLabel;
  const timingsToday = Settings.timings[today];
  const timingsTomorrow = Settings.timings[tomorrow];
  const timingsYesterday = Settings.timings[yesterday];
  const offset = Duration.fromObject({minute: Settings.offset})
  const sehriToday = DateTime.fromFormat(timingsToday.fajr, "H:mm").plus(offset);
  const iftarToday = DateTime.fromFormat(timingsToday.maghrib, "H:mm").plus(offset);
  const sehriTomorrow = DateTime.fromFormat(timingsTomorrow.fajr, "H:mm").plus(
    oneDayDuration,
  ).plus(offset);
  const iftarYesterday = DateTime.fromFormat(
    timingsYesterday.maghrib,
    "H:mm",
  ).minus(oneDayDuration).plus(offset);

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


export const getIslamicDate = () => { 
  return new Intl.DateTimeFormat('en-IN-u-ca-islamic', {day: 'numeric', month: 'long',weekday: 'long',year : 'numeric'}).format(
    DateTime.now().plus(Duration.fromObject({days: Settings.hijriOffset})).toJSDate()
  );
}