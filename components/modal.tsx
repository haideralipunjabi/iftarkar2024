import React from "react";

export function ModalOverlay() {
  return (
    <div className="absolute inset-0  z-10 h-screen w-screen bg-black/50"></div>
  );
}

export function ModalCard({ children }: { children?: React.ReactNode }) {
  return (
    <div className="absolute inset-0 z-20 m-auto h-min w-5/6 rounded-lg bg-primary sm:w-4/6 lg:w-1/2 xl:w-1/3">
      {children}
    </div>
  );
}
export function ModalHeader({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative w-full rounded-t-lg bg-secondary p-2">
      {children}
    </div>
  );
}

export function ModalBody({ children }: { children?: React.ReactNode }) {
  return <div className="flex flex-col gap-y-3 p-8">{children}</div>;
}
