import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính sách quyền riêng tư NearU | StorePublish",
  description: "Chính sách quyền riêng tư của ứng dụng NearU.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function NearuPrivacyPolicyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
