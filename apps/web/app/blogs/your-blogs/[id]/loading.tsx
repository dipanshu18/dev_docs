export default function Loading() {
  return (
    <div className="p-10">
      <div className="flex w-full flex-col gap-4">
        <div className="skeleton h-96 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    </div>
  );
}
