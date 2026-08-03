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
  metadataBase: new URL("https://likecimu98-sys.github.io/dri-growth-site/"),
  title: "DRI — развитие и управление бизнесом на Ozon",
  description:
    "Консалтинг, запуск и операционное управление для прибыльного роста бизнеса на Ozon.",
  keywords: [
    "развитие бизнеса на Ozon",
    "консалтинг Ozon",
    "управление магазином Ozon",
    "аудит магазина Ozon",
    "Ozon",
    "аналитика продаж",
  ],
  openGraph: {
    title: "DRI — цифровые решения с измеримым эффектом",
    description:
      "Строим прибыльный Ozon-бизнес как управляемую систему.",
    type: "website",
    locale: "ru_RU",
    siteName: "DRI Agency",
    url: "https://likecimu98-sys.github.io/dri-growth-site/",
    images: [
      {
        url: "https://likecimu98-sys.github.io/dri-growth-site/og.png",
        width: 1734,
        height: 907,
        alt: "DRI — цифровые решения с измеримым эффектом",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DRI — развитие бизнеса на Ozon",
    description: "Консалтинг и управление с измеримым эффектом в прибыли.",
    images: ["https://likecimu98-sys.github.io/dri-growth-site/og.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "DRI",
  description: "Консалтинг и операционное развитие бизнеса на Ozon",
  url: "https://likecimu98-sys.github.io/dri-growth-site/",
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
