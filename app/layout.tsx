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
        {children}
        <div className="bg-[url('/background.png')] fixed top-0 left-0 w-full h-full -z-20 bg-cover bg-center"></div>
      </body>
    </html>
  );
}
