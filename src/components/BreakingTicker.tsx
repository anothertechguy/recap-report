import { articles } from "@/lib/articles";

const BreakingTicker = () => {
  // Get titles from the latest 8 articles to use as breaking news
  const headlines = articles.slice(0, 8).map(a => a.title);
  const doubled = [...headlines, ...headlines];

  return (
    <div className="relative h-10 bg-accent overflow-hidden z-50">
      <div className="absolute inset-0 flex items-center">
        {/* BREAKING label */}
        <div className="relative z-20 flex items-center gap-2 px-4 bg-primary h-full flex-shrink-0">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-white text-[10px] font-extrabold uppercase tracking-[0.15em] font-body">
            Breaking
          </span>
        </div>

        <div className="flex items-center gap-8 ticker-scroll whitespace-nowrap ml-4">
          {doubled.map((headline, i) => (
            <span key={i} className="flex items-center gap-6">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <span className="text-accent-foreground/90 text-xs font-medium uppercase tracking-[0.08em] font-body">
                {headline}
              </span>
            </span>
          ))}
        </div>
      </div>
      <div className="absolute left-24 top-0 bottom-0 w-12 bg-gradient-to-r from-accent to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-accent to-transparent z-10" />
    </div>
  );
};

export default BreakingTicker;
