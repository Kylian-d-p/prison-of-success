import type { Metadata } from "next";
import FullscreenButton from "./components/fullscreen-button";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Red Line",
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
        {children}
        <FullscreenButton />
        <div className="bg-[url('/background.png')] fixed top-0 left-0 w-full h-full -z-20 bg-cover bg-center"></div>
      </body>
    </html>
  );
}
