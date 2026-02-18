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

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const startDate = DateTime.fromFormat(
    process.env.NEXT_PUBLIC_RAMADAN_START_DATE!,
    "yyyy-MM-dd",
  );

  const offsets = [
    {
      name: slug != "tsajk" ? "Srinagar" : "Anantnag",
      offset: 0,
    },
    ...timings[slug as TimingKeys].offsets,
  ];

  const pdfs = {
    raheemiya:
      "https://drive.google.com/file/d/1QhF4_7nsZjQtFg_rWcaktjSRj-pkvAXJ/view?usp=drive_link",
    etk: "https://drive.google.com/file/d/14C4o_FGC91SNzUFZb8ztIUTh6287LBu6/view?usp=drive_link",
    ahlehadees:
      "https://drive.google.com/file/d/1vbgVEY1UApIcYQE9h95Awsj7MBmuAWPW/view?usp=drive_link",
    tsajk:
      "https://drive.google.com/file/d/1NEzsc7LmdiiuKQA4ohmFuNL39db_-qTI/view?usp=drive_link",
    ajksa:
      "https://drive.google.com/file/d/1_wCJSliSM8EcOkxGtOSgNj3roNG7NAeX/view?usp=drive_link",
  };

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-8">
      <Image className="logo h-8" src={logo} alt="Iftarkar Logo" />

      <h1 className="mt-5 text-center text-2xl font-bold text-ink sm:text-3xl">
        {getLabel(slug)}
      </h1>

      {/* Action buttons */}
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        <PrintButton />
        <a
          className="hide-print rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-card transition-all hover:bg-accent-dark hover:shadow-card-hover"
          href={pdfs[slug as keyof typeof pdfs]}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download PDF
        </a>
        <ICalModal
          name={timings[slug as TimingKeys].name}
          offsets={offsets}
        />
      </div>

      {/* Table */}
      <div className="card mt-6 w-full overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-accent text-white">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Day
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Date
              </th>
              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider">
                Sehri
              </th>
              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider">
                Iftar
              </th>
            </tr>
          </thead>
          <tbody>
            {arrayRange(0, 29, 1).map((val) => {
              const currDate = startDate.plus(
                Duration.fromObject({ day: val }),
              );
              const times = getIftarSehriForDate(
                currDate,
                slug as TimingKeys,
              );
              return (
                <tr
                  key={val}
                  className={classNames(
                    "border-b border-border-light transition-colors last:border-0 hover:bg-bg",
                    { "bg-bg-warm/50": val % 2 === 0 },
                  )}
                >
                  <td className="px-5 py-2.5 font-semibold text-ink">
                    {val + 1}
                  </td>
                  <td className="px-5 py-2.5 text-ink-secondary">
                    {currDate.toFormat("dd-MM-yyyy")}
                  </td>
                  <td className="px-5 py-2.5 text-right font-mono tabular-nums text-ink">
                    {times.sehri.toFormat("hh:mm a")}
                  </td>
                  <td className="px-5 py-2.5 text-right font-mono tabular-nums font-semibold text-accent">
                    {times.iftar.toFormat("hh:mm a")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Notes */}
      <div
        className={classNames("mt-4 text-center text-sm text-ink-secondary", {
          hidden: slug != "etk",
        })}
      >
        Note: Sehri ends 10 minutes before Fajr for ahtiyat / imsak.
      </div>
      <div
        className={classNames("mt-4 text-center text-sm text-ink-secondary", {
          hidden: slug != "ajksa",
        })}
      >
        Note: Sehri ends 5 minutes before Fajr for ahtiyat / imsak (The
        timings above are for Fajr).
      </div>

      {/* Offsets */}
      <div className="offsets mt-6 hidden md:block">
        <h4
          className={classNames(
            "mb-2 text-center text-xs font-semibold uppercase tracking-wider text-ink-muted",
            {
              hidden: timings[slug as TimingKeys].offsets.length === 0,
            },
          )}
        >
          Offsets
        </h4>
        <p className="flex flex-row flex-wrap justify-center gap-2 gap-x-6 text-sm text-ink-secondary">
          {timings[slug as TimingKeys].offsets.map((offset, idx) => (
            <span key={idx}>
              {offset.name}:{" "}
              <span className="font-mono font-semibold text-accent">
                {offset.offset > 0 ? "+" : ""}
                {offset.offset}
              </span>{" "}
              min
            </span>
          ))}
        </p>
        <h4
          className={classNames("text-center text-sm text-ink-secondary", {
            hidden: timings[slug as TimingKeys].offsets.length != 0,
          })}
        >
          Timings are for Srinagar City
        </h4>
      </div>

      <div className="footer mt-6 text-center text-xs text-ink-muted">
        Visit: <i>iftarkar.com</i> · <i>namazpar.com</i>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  return Object.keys(timings).map((key) => ({
    slug: key,
  }));
}
