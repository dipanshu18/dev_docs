import { Metadata } from "next";
import "./styles.css";
import { AR_One_Sans } from "next/font/google";

const sans = AR_One_Sans({ subsets: ["vietnamese"], weight: "600" });

export const metadata: Metadata = {
  title: "Dev Docs",
  description:
    "A developer's blogging platform for sharing their knowledge and learnings with others",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sans.className}>
        <main className="container mx-auto"></main>
        {children}
      </body>
    </html>
  );
}
