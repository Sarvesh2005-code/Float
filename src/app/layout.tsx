import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google"; // Space-themed fonts
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";
import { Navbar } from "@/components/layout/navbar";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Float | Zero-G Gaming",
  description: "Play instantly. No limits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${inter.variable} antialiased bg-void text-starlight font-sans`}
      >
        <AuthProvider>
          <Navbar />
          <div className="pt-16 min-h-screen relative z-10">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
