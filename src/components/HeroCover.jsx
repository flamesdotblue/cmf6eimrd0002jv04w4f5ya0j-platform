import Spline from '@splinetool/react-spline';

export default function HeroCover() {
  return (
    <header className="relative h-[20vh] min-h-[220px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/UGnf9D1Hp3OG8vSG/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-950/60 to-neutral-950/30 pointer-events-none" />

      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center gap-6">
        <div className="shrink-0">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8Ks14uqyfQgdDh5IaNMPHtQo6ChgSpkjQJA&s"
            alt="ATF module icon"
            className="w-20 h-20 md:w-28 md:h-28 rounded-lg object-cover shadow-2xl border border-white/20 transform rotate-6 hover:rotate-0 transition-transform duration-500 ease-out"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            ATF Preperation Module
          </h1>
          <p className="text-neutral-200/90 mt-2 max-w-2xl">
            Strategy training hub with interactive visuals and hands-on coding.
          </p>
        </div>
      </div>
    </header>
  );
}
