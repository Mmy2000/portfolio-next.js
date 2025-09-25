"use client"

export function PageLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="relative">
          <div className="w-12 h-12 border-4 border-muted rounded-full animate-spin border-t-primary" />
          <div className="absolute inset-0 w-12 h-12 border-4 border-transparent rounded-full animate-ping border-t-primary/20" />
        </div>

        {/* Loading text */}
        <p className="text-muted-foreground text-sm animate-pulse">Loading...</p>
      </div>
    </div>
  )
}
