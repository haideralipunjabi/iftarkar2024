import {
  ModalOverlay,
  ModalCard,
  ModalHeader,
  ModalBody,
  ModalClose,
} from "./modal";
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
          <h2 className="text-lg font-semibold text-white">Calendars</h2>
          <ModalClose onClick={() => setHidden(true)} />
        </ModalHeader>
        <ModalBody>
          {Object.entries(timings).map(([key, value]) => (
            <Link
              className="group flex items-center justify-between rounded-lg border border-border bg-bg px-4 py-3 text-sm font-medium text-ink transition-all duration-200 hover:border-accent/30 hover:bg-accent-light hover:text-accent"
              key={key}
              href={`/calendars/${key}`}
            >
              {value.name}
              <span className="text-ink-muted transition-colors group-hover:text-accent">
                →
              </span>
            </Link>
          ))}
        </ModalBody>
      </ModalCard>
    </>
  );
}
