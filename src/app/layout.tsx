import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Nav } from "@/components/nav";
import { CommandPalette } from "@/components/command-palette";
import { Spotlight } from "@/components/spotlight";
import { site } from "@/lib/data";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Arun Rawat",
    "AI Engineer",
    "Applied AI Engineer",
    "Backend Engineer",
    "Full-Stack Engineer",
    "AI Integration",
    "LLM",
    "RAG",
    "LangGraph",
    "FastAPI",
    "Voice AI",
    "OpenAI",
    "Software Engineer India",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name} — ${site.role}`,
    description: site.description,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  url: site.url,
  image: `${site.url}/arun.png`,
  address: { "@type": "PostalAddress", addressLocality: "Noida", addressCountry: "IN" },
  alumniOf: "Graphic Era Hill University",
  worksFor: { "@type": "Organization", name: "PenIT Technology Pvt. Ltd." },
  sameAs: [site.linkedin, site.github],
  knowsAbout: ["Artificial Intelligence", "Large Language Model", "RAG", "Voice AI", "FastAPI", "Full-Stack Development"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable}`}>
      <body className="grain min-h-dvh overflow-x-clip">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <SmoothScroll>
          <Spotlight />
          <Nav />
          <CommandPalette />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
