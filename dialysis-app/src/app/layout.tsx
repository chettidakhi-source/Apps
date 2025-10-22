import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Centre de Dialyse - Tableau de Bord",
  description: "Application de gestion des séances de dialyse",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
