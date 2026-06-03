import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import { Inter, Noto_Sans_SC } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sc",
});

export const metadata = {
  title: "北航具身院论文阅读档案",
  description: "研究院成员每周论文阅读与讨论记录。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh-CN"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${notoSansSC.variable}`}
    >
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}