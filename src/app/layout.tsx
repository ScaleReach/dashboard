import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import logo from "@/public/logo.svg"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ScaleReach - Dashboard",
  description: "Dashboard to manage intents",
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
        <div className="flex justify-between p-4">
          <img src={logo.src} className="h-6" />
          <p className="font-bold">john@scalereach.team</p>
        </div>
        {children}
      </body>
    </html>
  );
}
