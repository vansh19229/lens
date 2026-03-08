const SkeletonCard = () => (
  <div className="glass-card overflow-hidden animate-pulse">
    <div className="bg-white/05 h-52 w-full" />
    <div className="p-4 space-y-3 border-t border-white/05">
      <div className="h-3 bg-white/08 rounded w-1/3" />
      <div className="h-4 bg-white/08 rounded w-3/4" />
      <div className="h-3 bg-white/05 rounded w-1/2" />
      <div className="flex items-center gap-2 pt-1">
        <div className="h-5 bg-white/08 rounded w-1/3" />
        <div className="h-4 bg-white/05 rounded w-1/4" />
      </div>
    </div>
  </div>
);

export default SkeletonCard;

