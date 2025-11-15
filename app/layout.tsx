import type { Metadata } from "next";
import { DM_Serif_Display, Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const dmSerifDisplay = DM_Serif_Display({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif',
})

export const metadata: Metadata = {
  title: "Shield of Athena",
  description:
    "The Shield of Athena is a non-profit organization for victims of family violence. We offer emergency shelter and professional services to women and their children. ",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${dmSerifDisplay.variable} antialiased`}
      >
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
