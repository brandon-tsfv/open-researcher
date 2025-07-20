import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import "./globals.css"
import { PasswordProtection } from "@/components/password-protection"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Betta Fish",
  description: "AI-powered research assistant",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get master password from environment variable
  const MASTER_PASSWORD = process.env.MASTER_PASSWORD || "betta2024"

  return (
    <html lang="en">
      <body className={inter.className}>
        <PasswordProtection correctPassword={MASTER_PASSWORD}>
          {children}
        </PasswordProtection>
        <Toaster />
      </body>
    </html>
  )
}
