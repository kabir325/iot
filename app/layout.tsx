import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { AuthProvider } from "@/contexts/AuthContext";

const fragmentMono = localFont({
  src: [
    {
      path: "./fonts/FragmentMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/FragmentMono-Italic.ttf",
      weight: "400",
      style: "italic",
    }
  ],
  variable: "--font-fragment-mono",
});


export const metadata: Metadata = {
  title: "IoT For Everyone",
  description: "IoT playground",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fragmentMono.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
