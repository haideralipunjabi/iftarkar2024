import Timer from "@/components/timer";
import { Settings } from "@/lib/settings";
import { faCalendarAlt, faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex items-center justify-center">
      <div className="px-4 sm:px-8 md:px-32 lg:px-64">
        <Timer />
        <div className="text-3 mt-8 flex flex-col gap-y-3 text-center text-white">
          <Link
            className="rounded-full bg-secondary py-2"
            href={`/calendars/${Settings.method}`}
          >
            <FontAwesomeIcon className="mx-4 inline-block w-8" icon={faCalendarAlt} />
            Get Ramzan Calendar
          </Link>
          <Link
            className="rounded-full bg-secondary py-2"
            href={`https://haider.id/namazpar`}
          >
            <FontAwesomeIcon className="mx-4 inline-block w-8" icon={faMobileAlt} />
            Download Mobile App
          </Link>
        </div>
      </div>
    </main>
  );
}
