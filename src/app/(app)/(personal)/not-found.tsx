import Link from "next/link"
import { Button } from "@components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function NotFound() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-extrabold tracking-tight">Whoops!</h1>
      <p>The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/">
        <Button variant={"ghost"} className="flex items-center gap-1 pr-6">
          <ChevronLeft className="h-4 w-4" />
          Back to home
        </Button>
      </Link>
    </main>
  )
}
