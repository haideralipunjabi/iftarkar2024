"use client";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalOverlay, ModalCard, ModalHeader, ModalBody } from "./modal";
import React, { useState } from "react";
import Link from "next/link";
import { OffsetType } from "@/types";

export default function ICalModal({
  name,
  offsets,
}: {
  name: string;
  offsets: Array<OffsetType>;
}) {
  const [hidden, setHidden] = useState(true);
  const button = (
    <button
      onClick={() => {
        setHidden(false);
      }}
      className="text-2 mx-auto w-min rounded-full bg-secondary px-16 py-2"
    >
      Download iCal
    </button>
  );
  if (hidden) return button;
  return (
    <>
      {button}
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
          {offsets.map((offset, key) => (
            <Link
              className="text-3 text-white underline hover:cursor-pointer"
              key={key}
              href={`/ical/${name}-${offset.offset}.ics`}
            >
              {offset.name}
            </Link>
          ))}
        </ModalBody>
      </ModalCard>
    </>
  );
}
