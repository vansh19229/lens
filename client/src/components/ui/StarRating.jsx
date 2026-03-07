import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating = 0, size = 'sm', showCount = false, count = 0 }) => {
  const sizeClass = size === 'lg' ? 'text-lg' : size === 'md' ? 'text-base' : 'text-sm';
  const stars = [];
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;

  for (let i = 0; i < full; i++) stars.push('full');
  if (half) stars.push('half');
  while (stars.length < 5) stars.push('empty');

  return (
    <div className="flex items-center gap-1">
      <div className={`flex items-center gap-0.5 ${sizeClass}`}>
        {stars.map((s, i) =>
          s === 'full' ? (
            <FaStar key={i} className="text-amber-400" />
          ) : s === 'half' ? (
            <FaStarHalfAlt key={i} className="text-amber-400" />
          ) : (
            <FaRegStar key={i} className="text-white/20" />
          )
        )}
      </div>
      {showCount && (
        <span className="text-xs text-white/30">({count})</span>
      )}
    </div>
  );
};

export default StarRating;

