export default function AdminLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute top-0 left-0 h-full w-full rounded-full border-4 border-[#3b3f54]/30"></div>
          <div className="absolute top-0 left-0 h-full w-full rounded-full border-4 border-[#d3bc8e] border-t-transparent animate-spin"></div>
        </div>
        <p className="text-[#8a8d99] text-sm font-medium animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
