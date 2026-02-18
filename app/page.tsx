"use client";
import CalendarModal from "@/components/calendarsModal";
import { DuasContainer } from "@/components/duas";
import Timer from "@/components/timer";
import { faCalendarAlt, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [modalHidden, setModalHidden] = useState(true);

  return (
    <>
      <main className="mx-auto flex w-full max-w-lg flex-col gap-y-6 px-4 py-8 sm:py-10">
        <Timer />

        <div id="duas" className="scroll-mt-24">
          <DuasContainer />
        </div>

        {/* CTA area */}
        <div className="flex animate-fade-up-d3 flex-col items-center gap-y-3">
          <p className="text-sm text-ink-muted">
            Iftarkar is now part of{" "}
            <span className="font-semibold text-ink">NamazPar</span>
          </p>

          <div className="flex w-full flex-col gap-2.5 sm:flex-row">
            <button
              className="flex flex-1 items-center justify-center gap-x-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white shadow-card transition-all duration-200 hover:bg-accent-dark hover:shadow-card-hover"
              onClick={() => setModalHidden(false)}
            >
              <FontAwesomeIcon className="w-3.5" icon={faCalendarAlt} />
              Get Ramzan Calendar
            </button>

            <Link
              className="group flex flex-1 items-center justify-center gap-x-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-ink-secondary shadow-card transition-all duration-200 hover:border-accent/30 hover:text-accent hover:shadow-card-hover"
              href="https://haider.id/namazpar"
            >
              Download NamazPar
              <FontAwesomeIcon
                className="w-3 transition-transform duration-200 group-hover:translate-x-0.5"
                icon={faArrowRight}
              />
            </Link>
          </div>
        </div>
      </main>
      <CalendarModal hidden={modalHidden} setHidden={setModalHidden} />
    </>
  );
}
