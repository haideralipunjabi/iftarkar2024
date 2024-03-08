"use client";
export default function PrintButton() {
  return (
    <div className="flex flex-row gap-x-2 w-min mx-auto">
      <button
        onClick={() => {
          document.body.classList.remove("print-bw");
          window.print();
        }}
        className="text-2 mx-auto w-min rounded-full bg-secondary px-16 py-2"
      >
        Print Colored
      </button>
      <button
        onClick={() => {
          document.body.classList.add("print-bw");
          window.print();
        }}
        className="text-2 mx-auto w-min rounded-full bg-secondary px-16 py-2"
      >
        Print
      </button>
    </div>
  );
}
