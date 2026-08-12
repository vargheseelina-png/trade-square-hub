export function Logo({ className = "", tone = "deep" }: { className?: string; tone?: "deep" | "light" }) {
  const mark = tone === "light" ? "var(--gold)" : "var(--primary)";
  const text = tone === "light" ? "text-white" : "text-deep";
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 40 40"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect x="1" y="1" width="38" height="38" rx="11" fill={mark} />
        <path d="M9 30V17l7-5 7 5v13h-4v-8h-6v8H9Z" fill="var(--deep-foreground)" opacity="0.95" />
        <path d="M25 30V13l6 4v13h-6Z" fill="var(--deep-foreground)" opacity="0.6" />
      </svg>
      <span className="leading-none">
        <span className={`block font-display text-[1.05rem] font-extrabold tracking-tight ${text}`}>
          TRADE SQUARE
        </span>
        <span className="block text-[0.6rem] font-semibold tracking-[0.22em] text-gold">
          TOGETHER WE GROW
        </span>
      </span>
    </span>
  );
}
