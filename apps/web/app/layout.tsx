import { Metadata } from "next";
import "./globals.css";
import { NextAuthProvider } from "./providers";
import { Toaster } from "sonner";

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
      <body>
        <NextAuthProvider>
          <main>
            {children}
            <Toaster richColors />
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
