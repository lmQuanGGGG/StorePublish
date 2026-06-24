import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Bảng Báo Giá Dịch Vụ Đưa App Lên Store - Tiết Kiệm & Chuyên Nghiệp",
  description: "Dịch vụ đưa app lên Google Play & App Store chuyên nghiệp, tiết kiệm.",
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
