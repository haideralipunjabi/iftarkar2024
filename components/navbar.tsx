"use client";
import React, { useState } from "react";
import SettingsModal from "./settings";

export default function Navbar() {
  const [settingsHidden, setSettingsHidden] = useState(true);
  return (
    <>
      <NavbarContainer>
        <NavbarItem
          onClick={() => {
            setSettingsHidden(false);
          }}
        >
          Settings
        </NavbarItem>
      </NavbarContainer>
      <SettingsModal hidden={settingsHidden} setHidden={setSettingsHidden} />
    </>
  );
}

function NavbarContainer({ children }: { children?: React.ReactNode }) {
  return (
    <nav className="fixed inset-x-0 flex flex-row gap-x-4 bg-secondary px-4 text-lg text-white shadow-lg">
      {children}
    </nav>
  );
}
function NavbarItem({
  children,
  onClick,
}: {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler;
}) {
  if (onClick) {
    return (
      <button className="h-full p-2 hover:bg-primary" onClick={onClick}>
        {children}
      </button>
    );
  }
  return <li>{children}</li>;
}
