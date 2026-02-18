"use client";
import {
  ModalOverlay,
  ModalCard,
  ModalHeader,
  ModalBody,
  ModalClose,
} from "./modal";
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
      onClick={() => setHidden(false)}
      className="rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-ink-secondary shadow-card transition-all duration-200 hover:border-accent/30 hover:text-accent hover:shadow-card-hover"
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
          <h2 className="text-lg font-semibold text-white">Download Calendar</h2>
          <ModalClose onClick={() => setHidden(true)} />
        </ModalHeader>
        <ModalBody>
          {offsets.map((offset, key) => (
            <Link
              className="group flex items-center justify-between rounded-lg border border-border bg-bg px-4 py-3 text-sm font-medium text-ink transition-all duration-200 hover:border-accent/30 hover:bg-accent-light hover:text-accent"
              key={key}
              href={`/ical/${name}-${offset.offset}.ics`}
            >
              {offset.name}
              <span className="text-ink-muted transition-colors group-hover:text-accent">
                ↓
              </span>
            </Link>
          ))}
        </ModalBody>
      </ModalCard>
    </>
  );
}
