import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./theme.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adventureflow.ai"),
  title: "Adventure Flow | Your AI Transformation Partner",
  description:
    "We set and execute your enterprise AI strategy at startup speed. Strategy, transformation, and engineering—so you win the AI native future.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Adventure Flow | Your AI Transformation Partner",
    description:
      "We set and execute your enterprise AI strategy at startup speed.",
    url: "https://adventureflow.ai",
    siteName: "Adventure Flow",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adventure Flow | Your AI Transformation Partner",
    description:
      "We set and execute your enterprise AI strategy at startup speed.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-contrast min-h-screen flex flex-col`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Adventure Flow",
              url: "https://adventureflow.ai",
              logo: "https://adventureflow.ai/logo.svg",
              description:
                "AI-native software development and enterprise AI transformation.",
              founder: { "@type": "Person", name: "Jeff Kumar" },
              foundingDate: "2024",
              sameAs: ["https://www.linkedin.com/company/adventure-flow-ai"],
            }),
          }}
        />
        <Navbar />
        <main className="flex-grow container mx-auto p-6">{children}</main>
        <footer className="bg-footer p-4 mt-auto">
          <div className="container mx-auto text-center">
            <p className="text-sm text-contrast">&copy; {new Date().getFullYear()} Adventure Flow Inc. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
