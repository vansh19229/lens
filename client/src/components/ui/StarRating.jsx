import { FiStar } from 'react-icons/fi';

const sizes = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

export default function StarRating({ rating = 0, count, size = 'md', showCount = true }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            className={`${sizes[size]} transition-colors ${
              star <= Math.round(rating)
                ? 'fill-amber-400 text-amber-400'
                : star - 0.5 <= rating
                ? 'fill-amber-200 text-amber-300 dark:fill-amber-600 dark:text-amber-600'
                : 'text-slate-200 dark:text-slate-700'
            }`}
          />
        ))}
      </div>
      {showCount && count !== undefined && (
        <span className="text-xs text-slate-400 dark:text-slate-500">({count})</span>
      )}
    </div>
  );
}
