interface TickerProps {
  items: string[];
  color?: 'orange' | 'pink' | 'blue';
}

export default function Ticker({ items, color = 'orange' }: TickerProps) {
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
