import { Metadata } from "next";
import "./styles.css";
import { Poppins } from "next/font/google";
import { NextAuthProvider } from "./providers";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

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
      <body className={poppins.className}>
        <NextAuthProvider>
          <main>{children}</main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
