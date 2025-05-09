export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-white border-t-transparent" />
    </div>
  );
}
