import { useMemo, useState } from 'react';

const files = ['a','b','c','d','e','f','g','h'];
const ranks = [8,7,6,5,4,3,2,1];

// Pieces: using Unicode
const PIECES = {
  WK: '♔',
  WQ: '♕',
  BN: '♞',
};

// Positioning a classic fork: Knight on d4 attacks c2 and e2.
// Coordinates helper
function key(file, rank) { return `${file}${rank}`; }

const initialPieces = {
  [key('c', 2)]: { type: 'WK', color: 'white' },
  [key('e', 2)]: { type: 'WQ', color: 'white' },
  [key('d', 4)]: { type: 'BN', color: 'black' },
};

export default function ChessBoard() {
  const [selections, setSelections] = useState(() => {
    const s = new Map();
    files.forEach(f => ranks.forEach(r => s.set(key(f,r), 0)));
    return s;
  });

  const pieces = useMemo(() => initialPieces, []);

  const onSquareClick = (sq) => {
    setSelections(prev => {
      const next = new Map(prev);
      const v = next.get(sq) ?? 0;
      next.set(sq, (v + 1) % 3);
      return next;
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative">
        <div className="grid grid-cols-8 grid-rows-8 w-[min(88vw,520px)] h-[min(88vw,520px)] select-none overflow-hidden rounded-lg border border-neutral-700 shadow-inner">
          {ranks.map((rank, rIdx) => (
            files.map((file, fIdx) => {
              const sq = key(file, rank);
              const isDark = (rIdx + fIdx) % 2 === 1;
              const sel = selections.get(sq) ?? 0;
              const borderColor = sel === 1 ? 'border-red-500' : sel === 2 ? 'border-sky-500' : 'border-transparent';
              const piece = pieces[sq];
              return (
                <button
                  key={sq}
                  onClick={() => onSquareClick(sq)}
                  className={`relative flex items-center justify-center ${isDark ? 'bg-emerald-900/40' : 'bg-emerald-100/20'} border ${borderColor}`}
                >
                  {piece && (
                    <span className={`text-3xl md:text-4xl ${piece.color === 'white' ? 'text-white' : 'text-neutral-200'}`}>
                      {PIECES[piece.type]}
                    </span>
                  )}
                  <span className="absolute bottom-1 right-1 text-[10px] text-neutral-400">
                    {sq}
                  </span>
                </button>
              );
            })
          ))}
        </div>
      </div>
      <div className="flex-1 text-sm text-neutral-300 leading-relaxed">
        <h3 className="text-neutral-100 font-semibold mb-2">What is a Fork?</h3>
        <p>
          A fork is a tactic where a single piece attacks two or more enemy pieces at the same time. Here, the black knight on <b>d4</b> attacks both the white king on <b>c2</b> and the white queen on <b>e2</b>.
        </p>
        <ul className="list-disc ml-5 mt-3 space-y-1">
          <li>Click squares to annotate your thought process with red/blue borders.</li>
          <li>Try visualizing candidate moves for the knight and responses from White.</li>
        </ul>
      </div>
    </div>
  );
}
