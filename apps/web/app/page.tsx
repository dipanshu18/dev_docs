import Image from "next/image";
import Link from "next/link";

import Blogging from "../public/blogging.jpg";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();

  if (session) {
    return (
      <div>
        <h1>{session.user?.image}</h1>
        <h1>{session.user?.email}</h1>
        <h1>{session.user?.name}</h1>
      </div>
    );
  }

  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-4 place-items-center  gap-10">
          <div className="md:col-span-2">
            <Image
              src={Blogging}
              width={500}
              height={500}
              className="rounded-full"
              alt="Person writing blogs on laptop"
            />
          </div>
          <div className="md:col-span-2">
            <h1 className="text-3xl lg:text-5xl font-bold">Dev Docs</h1>
            <p className="py-6">
              A developer's blogging platform for sharing their knowledge and
              learnings with others
            </p>
            <Link href={"/api/auth/signin"}>
              <button className="btn btn-primary">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
