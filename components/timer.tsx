"use client";
import { getTimes } from "@/lib/utils";
import { DateTime, Duration } from "luxon";
import { useEffect, useState } from "react";
import ProgressBar from "./progress_bar";
import { Settings } from "@/lib/settings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import SettingsModal from "./settings";

export default function Timer() {
  const [timeEnd, setTimeEnd] = useState<DateTime>();
  const [timeLeft, setTimeLeft] = useState<Duration>();
  const [upcomingLabel, setUpcomingLabel] = useState("");
  const [progress, setProgress] = useState(0);
  const [settingsHidden, setSettingsHidden] = useState(true);
  const [methodLabel, setMethodLabel] = useState("");
  const [offsetLabel, setOffsetLabel] = useState("");

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
    setMethodLabel(Settings.methodLabel);
    setOffsetLabel(Settings.offsetLabel);
    calculate();
    setInterval(() => {
      calculate();
    }, 1000);
  }, []);

  const isSehri = upcomingLabel === "Sehri";

  return (
    <>
      <div className="w-full animate-fade-up space-y-4">
        {/* Header bar */}
        <div className="flex items-center justify-between px-1">
          <div>
            <p className="text-[15px] font-bold tracking-tight text-ink">
              {methodLabel}
            </p>
            <p className="text-xs font-medium text-ink-muted">
              {offsetLabel}
            </p>
          </div>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-bg-warm hover:text-accent"
            onClick={() => setSettingsHidden(false)}
            aria-label="Settings"
          >
            <FontAwesomeIcon icon={faCog} className="text-base" />
          </button>
        </div>

        {/* Prayer cards row */}
        <div className="grid grid-cols-2 gap-3">
          {/* Sehri card */}
          <div
            className={`card relative overflow-hidden p-5 transition-all duration-300 ${
              isSehri ? "shadow-card-active" : ""
            }`}
          >
            <div className="mb-3 flex items-center gap-2">
              {isSehri ? (
                <span className="rounded-full bg-accent-light px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-accent">
                  Next
                </span>
              ) : (
                <>
                  <span className="rounded-full bg-orange-light px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-orange">
                    Now
                  </span>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-[15px] text-accent"
                  />
                </>
              )}
            </div>
            <p className="text-xl font-extrabold tracking-tight text-ink">
              Sehri
            </p>
            <p
              className={`mt-1 font-mono text-sm font-semibold tabular-nums ${
                isSehri ? "text-ink" : "text-ink-muted"
              }`}
            >
              {isSehri ? timeEnd?.toFormat("h:mm a") : "—"}
            </p>
          </div>

          {/* Iftar card */}
          <div
            className={`card relative overflow-hidden p-5 transition-all duration-300 ${
              !isSehri ? "shadow-card-active" : ""
            }`}
          >
            <div className="mb-3 flex items-center gap-2">
              {!isSehri ? (
                <span className="rounded-full bg-accent-light px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-accent">
                  Next
                </span>
              ) : (
                <>
                  <span className="rounded-full bg-orange-light px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-orange">
                    Now
                  </span>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-[15px] text-accent"
                  />
                </>
              )}
            </div>
            <p className="text-xl font-extrabold tracking-tight text-ink">
              Iftar
            </p>
            <p
              className={`mt-1 font-mono text-sm font-semibold tabular-nums ${
                !isSehri ? "text-ink" : "text-ink-muted"
              }`}
            >
              {!isSehri ? timeEnd?.toFormat("h:mm a") : "—"}
            </p>
          </div>
        </div>

        {/* Notes */}
        {Settings.method == "etk" && (
          <p className="px-1 text-xs font-medium text-ink-muted">
            Sehri ends 10 minutes before Fajr for ahtiyat.
          </p>
        )}
        {Settings.method == "ajksa" && (
          <p className="px-1 text-xs font-medium text-ink-muted">
            Sehri ends 5 minutes before Fajr for ahtiyat.
          </p>
        )}

        {/* Countdown card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f4a2c] via-[#145e3a] to-[#1a7a4e] p-6 shadow-[0_4px_24px_rgba(15,74,44,0.3)]">
          {/* Decorative radial glow */}
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
          
          <div className="relative flex flex-col items-center">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
              </span>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-200/80">
                {upcomingLabel === "Sehri" ? "Sehri ends in" : "Iftar in"}
              </p>
            </div>

            <p className="mt-3 text-center font-mono text-clock font-bold tabular-nums tracking-tighter text-white">
              {timeLeft?.toFormat("hh:mm:ss") ?? "00:00:00"}
            </p>

            {/* Segmented progress */}
            <div className="mt-5 w-full max-w-[260px]">
              <div className="flex gap-[3px]">
                {Array.from({ length: 20 }).map((_, i) => {
                  const filled = progress >= (i + 1) * 5;
                  return (
                    <div
                      key={i}
                      className={`h-2 flex-1 rounded-[2px] transition-all duration-500 ${
                        filled
                          ? "bg-emerald-300 shadow-[0_0_4px_rgba(110,231,183,0.3)]"
                          : "bg-white/10"
                      }`}
                    />
                  );
                })}
              </div>
              <p className="mt-2 text-center font-mono text-[11px] font-semibold tabular-nums text-emerald-300/50">
                {progress.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <SettingsModal hidden={settingsHidden} setHidden={setSettingsHidden} />
    </>
  );
}
