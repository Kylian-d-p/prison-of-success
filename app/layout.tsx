import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prison of Sucess",
  description: "Faites prospérer votre boite",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <h1>Prison of sucess</h1>
        {children}
      </body>
    </html>
  );
}
