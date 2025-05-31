import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Analytics } from "@vercel/analytics/next"

export default function Layout({ children }: { children: React.ReactNode }) {
    return ( 
        <main className="min-h-screen bg-background text-foreground font-fragment-mono antialiased flex flex-col">
            <Analytics />
            <Navbar />
            <div className="flex-grow">
                {children}
            </div>
            <Footer />
        </main>
    )
}
