export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
      <div className="aspect-square skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-3 skeleton rounded-full w-1/3" />
        <div className="h-4 skeleton rounded-full w-3/4" />
        <div className="h-3 skeleton rounded-full w-1/2" />
        <div className="flex items-center justify-between mt-2">
          <div className="h-5 skeleton rounded-full w-1/4" />
          <div className="h-3 skeleton rounded-full w-16" />
        </div>
      </div>
    </div>
  );
}
