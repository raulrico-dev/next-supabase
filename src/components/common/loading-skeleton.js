export default function LoadingSkeleton() {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black">
        <div className="flex items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-50 border-t-transparent" />
        </div>
      </div>
    )
  }