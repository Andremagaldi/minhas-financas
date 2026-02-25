import type { Metadata } from "next";
import "./globals.css";
import { GlobalAudioPlayer } from "@/components/player/global-audio-player";

export const metadata: Metadata = {
  title: "Minhas Financas",
  description: "MVP de gestao financeira pessoal com Next.js, Tailwind e Supabase"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body>
        <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-6 md:px-6">
          {children}
        </main>
        <GlobalAudioPlayer />
      </body>
    </html>
  );
}
