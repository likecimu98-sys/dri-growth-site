import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dri-growth-site.openai.site"),
  title: "DRI — рост продаж на маркетплейсах",
  description:
    "Стратегия, аналитика, реклама и контент для прибыльного роста брендов на Ozon, Wildberries и Яндекс Маркете.",
  keywords: [
    "продвижение на маркетплейсах",
    "агентство маркетплейсов",
    "Ozon",
    "Wildberries",
    "аналитика продаж",
  ],
  openGraph: {
    title: "DRI — цифровые решения с измеримым эффектом",
    description:
      "Превращаем продажи на маркетплейсах в управляемый и прибыльный рост.",
    type: "website",
    locale: "ru_RU",
    siteName: "DRI Agency",
    images: [
      {
        url: "/og.png",
        width: 1746,
        height: 907,
        alt: "DRI — цифровые решения с измеримым эффектом",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DRI — рост на маркетплейсах",
    description: "Стратегия, аналитика и креатив с эффектом в прибыли.",
    images: ["/og.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "DRI Agency",
  description: "Агентство роста брендов на маркетплейсах",
  url: "https://dri-growth-site.openai.site",
  email: "hello@dri.agency",
  areaServed: "RU",
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
