import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-14 items-center px-4 border-b">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Investment Platform</h1>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Link href="/login/investor">
            <Button variant="ghost">Investor Login</Button>
          </Link>
          <Link href="/login/founder">
            <Button variant="ghost">Founder Login</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Connect Investors with Promising Startups
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed">
                A platform where innovative startups meet strategic investors. Join our community to grow together.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/login/investor">
                  <Button>Join as Investor</Button>
                </Link>
                <Link href="/login/founder">
                  <Button variant="outline">Join as Founder</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
