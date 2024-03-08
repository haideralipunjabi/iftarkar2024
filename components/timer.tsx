"use client";
import { getIslamicDate, getTimes } from "@/lib/utils";
import { DateTime, Duration } from "luxon";
import { useEffect, useState } from "react";
import ProgressBar from "./progress_bar";
import { Settings } from "@/lib/settings";

export default function Timer() {
  const [timeEnd, setTimeEnd] = useState<DateTime>();
  const [timeLeft, setTimeLeft] = useState<Duration>();
  const [upcomingLabel, setUpcomingLabel] = useState("");
  const [progress, setProgress] = useState(0);

  const calculate = () => {
    const times = getTimes();
    setTimeEnd(times.next);
    setUpcomingLabel(times.label);
    setTimeLeft(times.next.diffNow(["days", "hours", "minutes", "second"]));
    setProgress(
      (times.previous.diffNow().milliseconds * -100) /
      times.next.diff(times.previous).milliseconds,
    );
  };
  useEffect(() => {
    calculate();
    setInterval(() => {
      calculate();
    }, 1000);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center gap-y-4 text-white">
      <span className="text-3xl">
        {getIslamicDate()}
      </span>
      <span className="text-3xl">
        {Settings.methodLabel} - {Settings.offsetLabel}
      </span>
      <span className="text-3xl">
        {upcomingLabel} - {timeEnd?.toFormat("HH:mm a")}
      </span>
      <div className="font-fira text-8xl text-white">
        {timeLeft?.toFormat("hh:mm:ss")}
      </div>
      <ProgressBar value={progress} />
    </div>
  );
}
