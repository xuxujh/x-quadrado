import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "X-Quadrado",
  description:
    "Dados, design e tecnologia trabalhando como sistema.",
  icons: {
    icon: "/icons/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}