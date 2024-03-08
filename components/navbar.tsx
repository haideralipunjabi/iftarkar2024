"use client";
import React from "react";
import Image from "next/image";
import logo from "@/public/logo_horizontal.svg";
import Link from "next/link";
export default function Navbar() {
  return (
    <>
      <NavbarContainer>
        <NavbarItem>
          <Link href="/">
            <Image className="h-12 md:h-16" src={logo} alt="Iftarkar Logo" />
          </Link>
        </NavbarItem>
      </NavbarContainer>
    </>
  );
}

function NavbarContainer({ children }: { children?: React.ReactNode }) {
  return (
    <nav className="inset-x-0 flex flex-row justify-center gap-x-4 p-4 text-lg text-white ">
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
  return <span className="p-2">{children}</span>;
}
