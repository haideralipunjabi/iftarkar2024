"use client";
import CalendarModal from "@/components/calendarsModal";
import Timer from "@/components/timer";
import { faCalendarAlt, faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [modalHidden, setModalHidden] = useState(true);

  return (
    <>
      <main className="flex items-center justify-center">
        <div className="px-4 sm:px-8 md:px-32 lg:px-64">
          <Timer />
          <div className="text-3 mt-8 flex flex-col gap-y-3 text-center text-white">
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
              className="rounded-full bg-secondary py-2"
              href={`https://haider.id/namazpar`}
            >
              <FontAwesomeIcon
                className="mx-4 inline-block w-8"
                icon={faMobileAlt}
              />
              Download Mobile App
            </Link>
          </div>
        </div>
      </main>
      <CalendarModal hidden={modalHidden} setHidden={setModalHidden} />
    </>
  );
}
