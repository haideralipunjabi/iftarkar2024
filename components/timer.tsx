"use client";
import { getTimes } from "@/lib/utils";
import { DateTime, Duration } from "luxon";
import { useEffect, useState } from "react";
import ProgressBar from "./progress_bar";
import { Settings } from "@/lib/settings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import SettingsModal from "./settings";

export default function Timer() {
  const [timeEnd, setTimeEnd] = useState<DateTime>();
  const [timeLeft, setTimeLeft] = useState<Duration>();
  const [upcomingLabel, setUpcomingLabel] = useState("");
  const [progress, setProgress] = useState(0);
  const [settingsHidden, setSettingsHidden] = useState(true);
  const calculate = () => {
    const times = getTimes();
    if (!times) return;
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
    <>
      <div className="flex flex-col items-center justify-center gap-y-4 text-white">
        {/* <span className="text-3">{getIslamicDate()}</span> */}
        <span className="text-3 text-center">
          {Settings.methodLabel} - {Settings.offsetLabel}{" "}
          <button
            className="ml-2"
            onClick={() => {
              setSettingsHidden(false);
            }}
          >
            {" "}
            <FontAwesomeIcon icon={faCog} />
          </button>
        </span>
        <span className="text-3">
          {upcomingLabel} - {timeEnd?.toFormat("HH:mm a")}
        </span>
        {Settings.method == "etk" && (
          <span className="text-2">
            Sehri ends 10 minutes before Fajr for ahtiyat.
          </span>
        )}
        <div className="text-clock font-robotomono text-white">
          {timeLeft?.toFormat("hh:mm:ss") ?? "12:34:56"}
        </div>
        <ProgressBar value={progress} />
      </div>
      <SettingsModal hidden={settingsHidden} setHidden={setSettingsHidden} />
    </>
  );
}
