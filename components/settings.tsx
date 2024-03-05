"use client";
import React from "react";
import { Settings } from "@/lib/settings";

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
      <SettingsOverlay />
      <SettingsCard>
        <SettingsHeader>
          <h2 className="text-center text-3xl text-white">Settings</h2>
          <button
            className="absolute right-5 top-2 text-white"
            onClick={() => {
              setHidden(true);
            }}
          >
            X
          </button>
        </SettingsHeader>
        <SettingsBody>
          <MethodPicker />
          <OffsetPicker />
        </SettingsBody>
      </SettingsCard>
    </>
  );
}

function SettingsOverlay() {
  return (
    <div className="absolute inset-0  z-10 h-screen w-screen bg-black/50"></div>
  );
}

function SettingsCard({ children }: { children?: React.ReactNode }) {
  return (
    <div className="absolute inset-0 z-20 m-auto h-min w-[512px] rounded-lg bg-primary">
      {children}
    </div>
  );
}
function SettingsHeader({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative w-full rounded-t-lg bg-secondary p-2">
      {children}
    </div>
  );
}

function SettingsBody({ children }: { children?: React.ReactNode }) {
  return <div className="flex flex-col gap-y-3 p-8">{children}</div>;
}

function SettingsFieldLabel({ children }: { children?: React.ReactNode }) {
  return <span className="text-lg text-white">{children}</span>;
}

function SettingsSelect({
  children,
  onChange,
}: {
  children?: React.ReactNode;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}) {
  return (
    <select className="w-full rounded-lg p-2" onChange={onChange}>
      {children}
    </select>
  );
}

function MethodPicker() {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    Settings.method = event.target.selectedOptions[0].value;
  };
  return (
    <>
      <SettingsFieldLabel>Method</SettingsFieldLabel>
      <SettingsSelect onChange={onChange}>
        {Object.entries(Settings.methods).map(([key, value]) => (
          <option selected={key == Settings.method} key={key} value={key}>
            {value}
          </option>
        ))}
      </SettingsSelect>
    </>
  );
}

function OffsetPicker() {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    Settings.offset = event.target.selectedOptions[0].value;
  };
  if (!Settings.isUsingCustomMethod) return <></>;
  return (
    <>
      <SettingsFieldLabel>Offset</SettingsFieldLabel>
      <SettingsSelect onChange={onChange}>
        {Object.entries(Settings.offsets).map(([key, value]) => (
          <option
            selected={key == Settings.offset.toString()}
            key={key}
            value={key}
          >
            {value}
          </option>
        ))}
      </SettingsSelect>
    </>
  );
}
