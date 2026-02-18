export default function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-border-light">
        <div
          className="h-full rounded-full bg-accent transition-all duration-700 ease-out"
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        />
      </div>
      <p className="mt-2 text-center text-xs tabular-nums text-ink-muted">
        {value.toFixed(1)}%
      </p>
    </div>
  );
}
