"use client";
import React, { useState } from "react";
import { Settings } from "@/lib/settings";
import { getIslamicDate } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

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
          <h2 className="text-3 text-center text-white">Settings</h2>
          <button
            className="text-2 absolute right-5 top-2 text-white"
            onClick={() => {
              setHidden(true);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </SettingsHeader>
        <SettingsBody>
          <MethodPicker />
          <OffsetPicker />
          <HijriOffset />
          <p className="text-2 text-white">
            Looking for more options? Check out our{" "}
            <a
              className="underline	 hover:cursor-pointer"
              href="https://haider.id/namazpar"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mobile App
            </a>
          </p>
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
    <div className="absolute inset-0 z-20 m-auto h-min w-5/6 rounded-lg bg-primary sm:w-4/6 lg:w-1/2 xl:w-1/3">
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
  return <span className="text-sm text-white md:text-lg">{children}</span>;
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
function HijriOffset() {
  const [offset, setOffset] = useState(Settings.hijriOffset);
  const updateHijriOffset = (change: number) => {
    Settings.hijriOffset = Settings.hijriOffset + change;
    setOffset(offset + change);
  };
  const decrease = () => {
    updateHijriOffset(-1);
  };
  const increase = () => {
    updateHijriOffset(1);
  };
  return (
    <>
      <SettingsFieldLabel>Hijri Offset</SettingsFieldLabel>
      <div className="text-3 flex flex-col items-center gap-y-2 text-white">
        <div className="flex w-full flex-row items-center justify-between">
          <button
            onClick={() => {
              decrease();
            }}
            className="flex items-center justify-center rounded-full bg-secondary p-4 text-xl"
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          {offset}
          <button
            onClick={() => {
              increase();
            }}
            className="flex items-center justify-center rounded-full bg-secondary p-4 text-xl"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <i className="text-lg md:text-xl">{getIslamicDate()}</i>
      </div>
    </>
  );
}
