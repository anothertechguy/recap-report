import { trendingHeadlines } from "@/lib/articles";

const BreakingTicker = () => {
  const doubled = [...trendingHeadlines, ...trendingHeadlines];

  return (
    <div className="relative h-11 bg-accent overflow-hidden z-50">
      <div className="absolute inset-0 flex items-center">
        <div className="flex items-center gap-8 ticker-scroll whitespace-nowrap">
          {doubled.map((headline, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="inline-block w-2 h-2 rounded-full bg-primary flex-shrink-0" />
              <span className="text-accent-foreground text-xs font-medium uppercase tracking-[0.1em] font-body">
                {headline}
              </span>
            </span>
          ))}
        </div>
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-accent to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-accent to-transparent z-10" />
    </div>
  );
};

export default BreakingTicker;
