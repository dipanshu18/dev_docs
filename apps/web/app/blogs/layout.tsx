import { ReactNode } from "react";
import Navbar from "../../components/Navbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function BlogsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession();
  console.log(session);
  if (!session) {
    return redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
