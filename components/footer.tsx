import Link from "next/link";

export default function Footer() {
  return (
    <footer className="inset-x-0 bottom-4 mb-4 text-center text-white">
      Made with 🤍 by{" "}
      <Link className="underline" href="https://haideralipunjabi.com">
        Haider Ali Punjabi
      </Link>{" "}
    </footer>
  );
}
