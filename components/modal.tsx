import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export function ModalOverlay() {
  return <div className="fixed inset-0 z-40 bg-black/30" />;
}

export function ModalCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="card w-full max-w-md animate-fade-up overflow-hidden shadow-card-hover">
        {children}
      </div>
    </div>
  );
}

export function ModalHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative border-b border-border bg-accent px-6 py-4">
      {children}
    </div>
  );
}

export function ModalBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-3 p-5">{children}</div>
  );
}

export function ModalClose({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/80 transition-colors hover:text-white"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faTimes} className="text-lg" />
    </button>
  );
}
