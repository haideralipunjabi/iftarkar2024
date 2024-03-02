import logo from "@/public/logo_horizontal.svg";
import Image from "next/image";

export default function TemporaryBanner() {
  return (
    <div className="flex flex-col gap-y-3">
      <Image className="h-16" src={logo} alt="IftarKar Logo" />
      <p className="text-center text-2xl text-white sm:text-3xl md:text-3xl lg:text-4xl">
        Iftarkar will return this Ramzan. <br />
        We have also launched{" "}
        <a
          className="underline"
          href="https://namazpar.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          NamazPar
        </a>{" "}
        a mobile application available on both{" "}
        <a
          className="underline"
          href="https://play.google.com/store/apps/details?id=com.namazpar"
          target="_blank"
          rel="noopener noreferrer"
        >
          Play Store
        </a>{" "}
        and{" "}
        <a
          className="underline"
          href="https://apps.apple.com/us/app/namazpar/id6475305055"
          target="_blank"
          rel="noopener noreferrer"
        >
          Apple App Store
        </a>{" "}
        that offers Namaz Timings & Iftar / Sehri Timings throughout the year
      </p>
    </div>
  );
}
