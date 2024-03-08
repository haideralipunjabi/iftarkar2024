export default function ProgressBar({ value }: { value: number }) {
  return (
    <div
      className="relative flex h-4 w-full overflow-hidden rounded-full bg-gray-700"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="flex flex-col justify-center overflow-hidden whitespace-nowrap rounded-full bg-secondary text-center text-xs text-white transition duration-500"
        style={{
          width: `${value}%`,
        }}
      ></div>
      <span className="absolute w-full text-center text-sm">
        {value.toFixed(2)}%
      </span>
    </div>
  );
}
