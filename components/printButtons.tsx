"use client";
export default function PrintButton() {
  return (
    <div className="hide-print flex flex-row gap-x-2">
      <button
        onClick={() => {
          document.body.classList.remove("print-bw");
          window.print();
        }}
        className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-card transition-all hover:bg-accent-dark hover:shadow-card-hover"
      >
        Print Color
      </button>
      <button
        onClick={() => {
          document.body.classList.add("print-bw");
          window.print();
        }}
        className="rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-ink-secondary shadow-card transition-all hover:border-accent/30 hover:text-accent"
      >
        Print B&W
      </button>
    </div>
  );
}
