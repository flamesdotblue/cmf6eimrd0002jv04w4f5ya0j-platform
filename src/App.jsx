import HeroCover from './components/HeroCover';
import DayLink from './components/DayLink';
import ChessBoard from './components/ChessBoard';
import CodeModule from './components/CodeModule';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-inter">
      <HeroCover />

      <main className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-6 space-y-6">
        <DayLink />

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 md:p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-3">Fork Pattern: Knight vs King and Queen</h2>
            <p className="text-neutral-300 text-sm mb-4">
              Click any square to cycle its border: Red → Blue → Default.
            </p>
            <ChessBoard />
          </div>

          <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 md:p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-3">Code Module</h2>
            <p className="text-neutral-300 text-sm mb-4">
              Switch between languages. Syntax colors are lightweight and can be replaced later with your preferred highlighter.
            </p>
            <CodeModule />
          </div>
        </section>
      </main>
    </div>
  );
}
