import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalOverlay, ModalCard, ModalHeader, ModalBody } from "./modal";
import React from "react";
import timings from "@/data/timings.json";
import Link from "next/link";
export default function CalendarModal({
  hidden,
  setHidden,
}: {
  hidden: boolean;
  setHidden: React.Dispatch<boolean>;
}) {
  if (hidden) return <></>;
  return (
    <>
      <ModalOverlay />
      <ModalCard>
        <ModalHeader>
          <h2 className="text-3 text-center text-white">Calendars</h2>
          <button
            className="text-2 absolute right-5 top-2 text-white"
            onClick={() => {
              setHidden(true);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </ModalHeader>
        <ModalBody>
          {Object.entries(timings).map(([key, value]) => (
            <Link
              className="text-3 text-white underline hover:cursor-pointer"
              key={key}
              href={`/calendars/${key}`}
            >
              {value.name}
            </Link>
          ))}
        </ModalBody>
      </ModalCard>
    </>
  );
}
