import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import OnlineCount from '@/components/OnlineCount';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WhosNext | WhosNext",
  description: "WhosNext - Connect with random people through video chat. Meet new friends instantly.",
  keywords: ["WhosNext", "video chat", "random chat", "video calling", "chat", "omegle", "connect", "people", "worldwide", "meet"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        // Add inside the body component:
        <OnlineCount />
      </body>
    </html>
  );
}
