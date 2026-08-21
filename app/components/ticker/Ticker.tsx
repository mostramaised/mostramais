import type { TickerColor } from './data';

interface TickerProps {
  items: string[];
  color?: TickerColor;
}

export default function Ticker({ items, color = 'orange' }: TickerProps) {
  if (items.length === 0) return null;

  const all = [...items, ...items, ...items];
  return (
    <div className={`mm-ticker mm-ticker--${color}`}>
      <div className="mm-ticker-track">
        {all.map((x, i) => (
          <span key={i} className="mm-ticker-item">
            {x}<span className="plus">+</span>
          </span>
        ))}
      </div>
    </div>
  );
}
