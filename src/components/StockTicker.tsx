import { TrendingUp, TrendingDown } from "lucide-react";

const stocks = [
  { symbol: "S&P 500", price: "5,842.31", change: "+1.24%", up: true },
  { symbol: "DOW", price: "43,127.88", change: "+0.87%", up: true },
  { symbol: "NASDAQ", price: "18,493.02", change: "-0.32%", up: false },
  { symbol: "AAPL", price: "234.56", change: "+2.15%", up: true },
  { symbol: "TSLA", price: "312.44", change: "-1.78%", up: false },
  { symbol: "AMZN", price: "198.72", change: "+0.94%", up: true },
  { symbol: "GOOG", price: "178.33", change: "+1.52%", up: true },
  { symbol: "META", price: "612.88", change: "-0.45%", up: false },
  { symbol: "MSFT", price: "445.12", change: "+0.68%", up: true },
  { symbol: "NVDA", price: "892.10", change: "+3.21%", up: true },
  { symbol: "BTC", price: "94,320", change: "+4.12%", up: true },
  { symbol: "ETH", price: "3,845", change: "+2.87%", up: true },
];

const StockTicker = () => {
  const doubled = [...stocks, ...stocks];

  return (
    <div className="relative h-9 bg-card border-b border-border overflow-hidden">
      <div className="absolute inset-0 flex items-center">
        <div className="flex items-center gap-6 stock-ticker-scroll whitespace-nowrap">
          {doubled.map((stock, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 text-[11px] font-body">
              <span className="font-semibold text-foreground tracking-wide">{stock.symbol}</span>
              <span className="text-muted-foreground">{stock.price}</span>
              <span className={`inline-flex items-center gap-0.5 font-medium ${stock.up ? "text-emerald-500" : "text-red-500"}`}>
                {stock.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {stock.change}
              </span>
              <span className="w-px h-3 bg-border ml-2" />
            </span>
          ))}
        </div>
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-card to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-card to-transparent z-10" />
    </div>
  );
};

export default StockTicker;
