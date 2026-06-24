import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://storepublish.com"),
  title: "StorePublish - Dịch vụ Đưa App lên Store (Google Play & App Store)",
  description: "Bảng báo giá dịch vụ đưa ứng dụng lên Google Play & App Store chuyên nghiệp, tiết kiệm. Hỗ trợ từ A-Z, bảo hành rủi ro reject.",
  keywords: ["đưa app lên store", "up app lên google play", "up app lên app store", "StorePublish", "publish app", "dịch vụ up app", "phát hành ứng dụng"],
  authors: [{ name: "Lê Minh Quang" }],
  openGraph: {
    title: "StorePublish - Dịch vụ Đưa App lên Store",
    description: "Dịch vụ đưa ứng dụng lên Google Play & App Store chuyên nghiệp, tiết kiệm. Hỗ trợ từ A-Z, bảo hành rủi ro reject.",
    url: "https://storepublish.com",
    siteName: "StorePublish",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StorePublish - Dịch vụ Đưa App lên Store",
    description: "Bảng báo giá dịch vụ đưa ứng dụng lên Google Play & App Store chuyên nghiệp, tiết kiệm.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} scroll-smooth`}
    >
      <body className="bg-slate-50 text-slate-900 min-h-screen selection:bg-indigo-500 selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
