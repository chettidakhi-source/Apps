import "./globals.css"
import { ReactNode } from "react"

export const metadata = {
  title: "Dialysis Dashboard",
  description: "Gestion des séances de dialyse",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gray-50 antialiased">{children}</body>
    </html>
  )
}