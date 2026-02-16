"use client";
import CalendarModal from "@/components/calendarsModal";
import { DuasContainer } from "@/components/duas";
import Timer from "@/components/timer";
import {
  faCalendarAlt,
  faMobileAlt,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [modalHidden, setModalHidden] = useState(true);

  return (
    <>
      <main className="mb-16 flex flex-col items-center justify-center gap-y-8 px-4 sm:px-8 md:px-32 lg:px-64">
        <div className="">
          <Timer />
          <div className="text-3 mt-8 flex flex-col gap-y-3 text-center text-white">
            <p>
              Note: Iftarkar is now part of NamazPar mobile app, <br /> download
              it from the link below
            </p>
            <button
              className="rounded-full bg-secondary py-2"
              onClick={() => {
                setModalHidden(false);
              }}
            >
              <FontAwesomeIcon
                className="mx-4 inline-block w-8"
                icon={faCalendarAlt}
              />
              Get Ramzan Calendar{" "}
            </button>
            <Link
              className="rounded-full bg-secondary px-4 py-2"
              href={`https://haider.id/namazpar`}
            >
              <FontAwesomeIcon
                className="mx-4 inline-block w-8"
                icon={faMobileAlt}
              />
              Download NamazPar Mobile App
            </Link>
            <Link
              className="rounded-full bg-secondary px-4 py-2"
              href={`https://kerhouse.cc/`}
              target="_blank"
            >
              <FontAwesomeIcon
                className="mx-4 inline-block w-8"
                icon={faMoon}
              />
              Donate & Download Eid Postcards!{" "}
            </Link>
          </div>
        </div>
        <DuasContainer />
      </main>
      <CalendarModal hidden={modalHidden} setHidden={setModalHidden} />
    </>
  );
}
