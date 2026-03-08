import { useState } from 'react';
import { formatPrice } from '../../utils/helpers';

const PriceRangeSlider = ({ min = 0, max = 10000, value, onChange }) => {
  const [localMin, setLocalMin] = useState(value?.[0] ?? min);
  const [localMax, setLocalMax] = useState(value?.[1] ?? max);

  const handleMinChange = (e) => {
    const val = Math.min(Number(e.target.value), localMax - 100);
    setLocalMin(val);
    onChange([val, localMax]);
  };

  const handleMaxChange = (e) => {
    const val = Math.max(Number(e.target.value), localMin + 100);
    setLocalMax(val);
    onChange([localMin, val]);
  };

  const leftPct = ((localMin - min) / (max - min)) * 100;
  const rightPct = 100 - ((localMax - min) / (max - min)) * 100;

  return (
    <div className="space-y-3 py-1">
      <div className="flex justify-between text-xs font-medium text-white/60">
        <span>{formatPrice(localMin)}</span>
        <span>{formatPrice(localMax)}</span>
      </div>
      <div className="relative h-1.5">
        <div className="absolute inset-0 bg-white/10 rounded-full" />
        <div
          className="absolute h-1.5 bg-blue-500 rounded-full"
          style={{ left: `${leftPct}%`, right: `${rightPct}%` }}
        />
        <input
          type="range" min={min} max={max} step={100} value={localMin} onChange={handleMinChange}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-1.5"
        />
        <input
          type="range" min={min} max={max} step={100} value={localMax} onChange={handleMaxChange}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-1.5"
        />
      </div>
    </div>
  );
};

export default PriceRangeSlider;

