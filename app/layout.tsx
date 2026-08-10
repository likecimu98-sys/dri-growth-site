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

const siteUrl = "https://dri-growth-site.sgolovko7.chatgpt.site/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "DRI — развитие действующего бизнеса на Ozon",
  description:
    "Помогаем владельцам действующих магазинов на Ozon увеличивать прибыль через аудит, аналитику, оценку команды и внедрение системных бизнес-процессов.",
  keywords: [
    "развитие бизнеса на Ozon",
    "консалтинг Ozon",
    "аудит магазина Ozon",
    "аудит команды Ozon",
    "аналитика продаж Ozon",
    "управление бизнесом на Ozon",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "DRI — системное развитие бизнеса на Ozon",
    description:
      "Находим точки роста, оцениваем эффективность команды, выстраиваем процессы и помогаем увеличить прибыль действующего магазина на Ozon.",
    type: "website",
    locale: "ru_RU",
    siteName: "DRI",
    url: siteUrl,
    images: [
      {
        url: "/og.png",
        width: 1734,
        height: 907,
        alt: "DRI — системное развитие действующего бизнеса на Ozon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DRI — системное развитие бизнеса на Ozon",
    description:
      "Находим точки роста, оцениваем команду и выстраиваем процессы для увеличения прибыли действующего магазина на Ozon.",
    images: ["/og.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "DRI",
  description:
    "Консалтинговая компания по системному развитию действующего бизнеса на Ozon",
  url: siteUrl,
  email: "dri.krd@bk.ru",
  areaServed: "RU",
  knowsAbout: [
    "Аудит бизнеса на Ozon",
    "Аналитика Ozon",
    "Аудит компетенций команды Ozon",
    "Операционное управление",
    "Автоматизация бизнес-процессов",
  ],
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
