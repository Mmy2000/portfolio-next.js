import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-2">Project Not Found</h1>
          <p className="text-muted-foreground">The project you're looking for doesn't exist or may have been moved.</p>
        </div>

        <div className="space-y-3">
          <Link href="/projects">
            <Button className="w-full hover-glow">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full bg-transparent">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
