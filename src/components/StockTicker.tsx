import { useEffect, useRef } from "react";

const StockTicker = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent double injection in React StrictMode
    if (container.current && container.current.children.length > 1) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
        { proName: "FOREXCOM:DJI", title: "Dow Jones" },
        { proName: "FOREXCOM:NSXUSD", title: "Nasdaq 100" },
        { description: "Apple", proName: "NASDAQ:AAPL" },
        { description: "Tesla", proName: "NASDAQ:TSLA" },
        { description: "Amazon", proName: "NASDAQ:AMZN" },
        { description: "Google", proName: "NASDAQ:GOOGL" },
        { description: "Meta", proName: "NASDAQ:META" },
        { description: "Nvidia", proName: "NASDAQ:NVDA" },
        { description: "Bitcoin", proName: "BITSTAMP:BTCUSD" },
        { description: "Ethereum", proName: "BITSTAMP:ETHUSD" }
      ],
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: "regular",
      colorTheme: "dark",
      locale: "en"
    });
    
    // Third-party ticker (script + CSS + websocket) — inject only after the page has loaded and
    // the main thread is idle, so it never competes with first paint or hydration.
    let idle = 0;
    const inject = () => { if (container.current) container.current.appendChild(script); };
    const schedule = () => {
      idle = typeof requestIdleCallback === "function" ? requestIdleCallback(inject, { timeout: 3000 }) : window.setTimeout(inject, 1500);
    };
    if (document.readyState === "complete") schedule(); else window.addEventListener("load", schedule, { once: true });
    return () => { window.removeEventListener("load", schedule); if (typeof cancelIdleCallback === "function") cancelIdleCallback(idle); else clearTimeout(idle); };
  }, []);

  return (
    <div className="h-[44px] bg-[#0a0a0a] border-b border-white/10 overflow-hidden flex items-center justify-center pointer-events-none">
      <div className="tradingview-widget-container w-full translate-y-[1px]" ref={container}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
};

export default StockTicker;
