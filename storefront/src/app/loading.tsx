import { Skeleton } from "@/components/ui/Skeleton"

export default function Loading() {
  return (
    <div className="container-app py-8">
      <Skeleton className="h-10 w-48 mb-4" />
      <Skeleton variant="text" className="h-4 w-96 mb-8" />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-80 w-full" />
        ))}
      </div>
    </div>
  )
}
