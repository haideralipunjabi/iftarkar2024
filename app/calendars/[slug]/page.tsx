import timings from "@/data/timings.json";
import { arrayRange, getIftarSehriForDate, getLabel } from "@/lib/utils";
import { TimingKeys } from "@/types";
import { DateTime, Duration } from "luxon";
import "./styles.css";
import Image from "next/image";
import logo from "@/public/logo_horizontal.svg";
import PrintButton from "@/components/printButtons";
import ICalModal from "@/components/icalModal";
import classNames from "classnames";

export default function Page({ params }: { params: { slug: string } }) {
  const startDate = DateTime.fromFormat(
    process.env.NEXT_PUBLIC_RAMADAN_START_DATE!,
    "yyyy-MM-dd",
  );

  const offsets = [
    {
      name: "Srinagar",
      offset: 0,
    },
    ...timings[params.slug as TimingKeys].offsets,
  ];

  const pdfs = {
    raheemiya:
      "https://drive.google.com/file/d/1hHd5bhDX4UgbOFUT9tOOx1J5QVdZnp9A/view?usp=sharing",
    etk: "https://drive.google.com/file/d/1zRuUZFMCbhsC9Sj5uGAfJu2Dx2lxj2pp/view?usp=sharing",
    ahlehadees:
      "https://drive.google.com/file/d/1CqI7wdT8MtXQww7wTeEUDkQESwXntJiw/view?usp=sharing",
    tsajk:
      "https://drive.google.com/file/d/1gLPD9Cm8WF5rORsAlbnTk2zC7Zn6ky0a/view?usp=sharing",
  };

  return (
    <main className="flex w-full justify-center text-white">
      <div className="flex w-full flex-col">
        <Image className="logo h-8" src={logo} alt="Iftarkar Logo" />
        <h1 className="text-center">{getLabel(params.slug)}</h1>
        <PrintButton />
        <div className="mx-auto flex w-min flex-row gap-x-2">
          <a
            className="text-2 mx-auto w-min rounded-full bg-secondary px-16 py-2 text-center"
            href={pdfs[params.slug as keyof typeof pdfs]}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download PDF
          </a>
          <ICalModal
            name={timings[params.slug as TimingKeys].name}
            offsets={offsets}
          />
        </div>
        <table className="text-center md:block">
          <thead>
            <tr>
              <th className="px-8">Day</th>
              <th className="px-16">Date</th>
              <th className="px-16">Sehri</th>
              <th className="px-16">Iftar</th>
            </tr>
          </thead>
          <tbody>
            {arrayRange(0, 29, 1).map((val) => {
              const currDate = startDate.plus(
                Duration.fromObject({ day: val }),
              );
              const times = getIftarSehriForDate(
                currDate,
                params.slug as TimingKeys,
              );
              return (
                <tr key={val}>
                  <td>{val + 1}</td>
                  <td>{currDate.toFormat("dd-MM-yyyy")}</td>
                  <td>{times.sehri.toFormat("hh:mm a")}</td>
                  <td>{times.iftar.toFormat("hh:mm a")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="offsets hidden md:block">
          <h4
            className={classNames("text-center text-white", {
              hidden: timings[params.slug as TimingKeys].offsets.length === 0,
            })}
          >
            Offsets:
          </h4>
          <p className="flex flex-row flex-wrap justify-center gap-2 gap-x-8">
            {timings[params.slug as TimingKeys].offsets.map((offset) => (
              <span key={offset.offset}>
                {offset.name}: {offset.offset}
              </span>
            ))}
          </p>
        </div>
        <div className="footer mt-2 text-center">
          Visit our websites: <i>iftarkar.com</i> <i>namazpar.com</i>
        </div>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  return Object.keys(timings).map((key) => ({
    slug: key,
  }));
}
