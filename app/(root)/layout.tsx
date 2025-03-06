import Navbar from "@/components/navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return ( 
        <main className="min-h-screen bg-background text-foreground font-fragment-mono antialiased">
            <Navbar />
            {children}
        </main>
    )
}
