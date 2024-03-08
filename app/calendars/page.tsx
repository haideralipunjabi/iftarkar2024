import timings from "@/data/timings.json";
export default function Page() {
    return (
        <main className="flex h-screen min-h-screen justify-center text-white">
            <div className="p-4 sm:p-8 md:p-32 lg:p-64">
                <h1 className="text-5xl">Download Ramadan Calendars</h1>
                <ul className="mt-16 text-2xl flex flex-col gap-y-3">
                    {
                        Object.entries(timings).map(([key, value]) => <li key={key}>{value.name}</li>)
                    }
                </ul>
            </div>
        </main>
    );
}