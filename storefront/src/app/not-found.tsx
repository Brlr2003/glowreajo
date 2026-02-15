import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/Button"

export default function NotFound() {
  return (
    <div className="container-app py-20 text-center">
      <div className="flex justify-center mb-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <Search className="h-10 w-10 text-primary" />
        </div>
      </div>
      <h1 className="font-heading text-6xl font-bold text-text-primary mb-3">404</h1>
      <h2 className="font-heading text-xl font-semibold text-text-primary mb-3">
        Page Not Found
      </h2>
      <p className="text-text-secondary mb-8 max-w-md mx-auto">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-4 justify-center">
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
        <Link href="/shop">
          <Button variant="outline">Browse Shop</Button>
        </Link>
      </div>
    </div>
  )
}
