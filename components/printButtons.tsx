"use client";
export default function PrintButton() {
  return (
    <button
      onClick={() => {
        window.print();
      }}
      className="text-3 mx-auto w-min rounded-full bg-secondary px-16 py-2"
    >
      Print
    </button>
  );
}
