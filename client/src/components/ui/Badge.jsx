const Badge = ({ type, className = '' }) => {
  const styles = {
    New: 'bg-green-500 text-white',
    Trending: 'bg-orange-500 text-white',
    Sale: 'bg-red-500 text-white',
  };
  if (!type) return null;
  return (
    <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${styles[type] || 'bg-gray-500 text-white'} ${className}`}>
      {type}
    </span>
  );
};

export default Badge;
