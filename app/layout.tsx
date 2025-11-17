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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
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
