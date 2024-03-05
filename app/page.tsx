import Timer from "@/components/timer";

export default async function Home() {
  return (
    <main className="flex h-screen min-h-screen items-center justify-center">
      <div className="p-4 sm:p-8 md:p-32 lg:p-64">
        <Timer />
      </div>
    </main>
  );
}
