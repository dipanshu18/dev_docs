import { ReactNode } from "react";
import Navbar from "../../components/Navbar";

export default function BlogsLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <Navbar />

        {children}
      </body>
    </html>
  );
}
