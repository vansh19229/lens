import { useCallback } from 'react';

export default function PriceRangeSlider({ min = 0, max = 10000, value = [0, 10000], onChange }) {
  const [minVal, maxVal] = value;
  const range = max - min;

  const getPercent = useCallback((val) => Math.round(((val - min) / range) * 100), [min, range]);

  const handleMinChange = (e) => {
    const newMin = Math.min(Number(e.target.value), maxVal - 100);
    onChange([newMin, maxVal]);
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(Number(e.target.value), minVal + 100);
    onChange([minVal, newMax]);
  };

  const minPercent = getPercent(minVal);
  const maxPercent = getPercent(maxVal);

  return (
    <div className="space-y-4">
      {/* Value display */}
      <div className="flex items-center justify-between">
        <div className="bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-1.5">
          <span className="text-sm font-semibold text-slate-900 dark:text-white">₹{minVal.toLocaleString()}</span>
        </div>
        <div className="text-xs text-slate-400 dark:text-slate-500">to</div>
        <div className="bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-1.5">
          <span className="text-sm font-semibold text-slate-900 dark:text-white">₹{maxVal.toLocaleString()}</span>
        </div>
      </div>

      {/* Slider */}
      <div className="relative h-2">
        {/* Track */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-slate-200 dark:bg-slate-700 rounded-full" />
        {/* Range */}
        <div
          className="absolute top-0 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={handleMinChange}
          className="absolute w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: minVal > max - 100 ? 5 : 3 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={handleMaxChange}
          className="absolute w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: 4 }}
        />
        {/* Thumbs */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white dark:bg-blue-500 border-2 border-blue-500 dark:border-blue-400 rounded-full shadow-md shadow-blue-500/30 pointer-events-none"
          style={{ left: `calc(${minPercent}% - 8px)` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white dark:bg-purple-500 border-2 border-purple-500 dark:border-purple-400 rounded-full shadow-md shadow-purple-500/30 pointer-events-none"
          style={{ left: `calc(${maxPercent}% - 8px)` }}
        />
      </div>
    </div>
  );
}
