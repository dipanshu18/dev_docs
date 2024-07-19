export default function SkeletonCard() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="skeleton bg-base-300 h-52 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
    </div>
  );
}
