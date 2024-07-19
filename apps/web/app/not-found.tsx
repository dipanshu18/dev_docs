import Image from "next/image";
import Link from "next/link";

import NotFoundPic from "../public/404.jpg";

export default function NotFound() {
  return (
    <div className="grid grid-cols-1 place-items-center gap-5 m-10">
      <h1 className="text-4xl text-center font-bold">Not Found</h1>
      <p>Could not find requested resource</p>
      <Image
        src={NotFoundPic}
        width={400}
        height={400}
        alt="404 not found image"
        className="rounded-full"
      />
      <Link href="/" className="btn btn-info">
        Return Home
      </Link>
    </div>
  );
}
