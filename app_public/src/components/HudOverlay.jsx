export default function HudOverlay() {
  return (
    <div className="hud-overlay absolute inset-0 pointer-events-none z-0">
      {/* Esquinas decorativas */}
      <svg
        className="absolute top-0 left-0 w-24 h-24 text-purple-500 opacity-30"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path d="M0,30 L0,0 L30,0" stroke="currentColor" strokeWidth="2" />
      </svg>
      <svg
        className="absolute top-0 right-0 w-24 h-24 text-purple-500 opacity-30"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path d="M70,0 L100,0 L100,30" stroke="currentColor" strokeWidth="2" />
      </svg>
      <svg
        className="absolute bottom-0 left-0 w-24 h-24 text-purple-500 opacity-30"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path d="M0,70 L0,100 L30,100" stroke="currentColor" strokeWidth="2" />
      </svg>
      <svg
        className="absolute bottom-0 right-0 w-24 h-24 text-purple-500 opacity-30"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path d="M100,70 L100,100 L70,100" stroke="currentColor" strokeWidth="2" />
      </svg>

      {/* Línea central estática */}
      <div className="absolute top-1/2 left-1/2 w-[2px] h-64 -translate-x-1/2 -translate-y-1/2 bg-purple-400 opacity-40" />
    </div>
  );
}
