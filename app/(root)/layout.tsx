import Navbar from "@/components/navbar"
import { Analytics } from "@vercel/analytics/next"

export default function Layout({ children }: { children: React.ReactNode }) {
    return ( 
        <main className="min-h-screen bg-background text-foreground font-fragment-mono antialiased">
            <Analytics />
            <Navbar />
            {children}
        </main>
    )
}
