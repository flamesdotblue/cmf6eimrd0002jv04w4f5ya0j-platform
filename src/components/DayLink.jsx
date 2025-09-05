export default function DayLink() {
  return (
    <div className="w-full">
      <a
        href="https://www.algopath.ai/problems/forked"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 transition text-white font-medium shadow-lg shadow-indigo-900/30"
      >
        Day 1: Forked
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link">
          <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <path d="m15 3 6 6"/>
          <path d="M21 3h-6v6"/>
        </svg>
      </a>
    </div>
  );
}
