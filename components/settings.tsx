"use client";
import React from "react";
import { Settings } from "@/lib/settings";
import {
  ModalOverlay,
  ModalCard,
  ModalHeader,
  ModalBody,
  ModalClose,
} from "./modal";

export default function SettingsModal({
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
          <h2 className="text-lg font-semibold text-white">Settings</h2>
          <ModalClose onClick={() => setHidden(true)} />
        </ModalHeader>
        <ModalBody>
          {/* Method */}
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
              Method
            </label>
            <select
              onChange={(e) => {
                Settings.method = e.target.value;
                window.location.reload();
              }}
              defaultValue={Settings.method}
              className="w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30"
            >
              {Object.entries(Settings.methods).map(([key, name]) => (
                <option key={key} value={key}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          {/* Offset */}
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
              Offset
            </label>
            <select
              onChange={(e) => {
                Settings.offset = parseInt(e.target.value);
                window.location.reload();
              }}
              defaultValue={Settings.offset}
              className="w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30"
            >
              {Object.entries(Settings.offsets).map(([key, name]) => (
                <option key={key} value={key}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          {/* Link */}
          <p className="mt-1 text-center text-xs text-ink-muted">
            Want more features?{" "}
            <a
              href="https://haider.id/namazpar"
              className="font-medium text-accent hover:underline"
            >
              Try our Mobile App →
            </a>
          </p>
        </ModalBody>
      </ModalCard>
    </>
  );
}
