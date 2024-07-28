import { getServerSession } from "next-auth";
import DraftsCard from "../../../components/DraftsCard";
import { prisma } from "../../../lib/prisma";

import DraftsEmpty from "../../../public/draftsEmpty.jpg";
import Image from "next/image";
import { Blog } from "../../../types";

async function fetchDrafts(email: string) {
  const drafts = await prisma.blog.findMany({
    where: {
      user: {
        email,
      },
      published: false,
    },
  });

  return drafts;
}

export default async function Drafts() {
  const session = await getServerSession();
  const drafts = await fetchDrafts(session?.user?.email!);

  if (drafts.length < 1) {
    return (
      <div className="grid grid-cols-1 place-items-center gap-2 m-10">
        <h1 className="md:col-span-2 text-4xl text-center font-bold">
          No drafts
        </h1>
        <Image
          className="rounded-full"
          src={DraftsEmpty}
          width={500}
          height={500}
          alt="Drafts empty illustration pic"
          priority
        />
      </div>
    );
  }

  return (
    <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center p-5 gap-10">
      {drafts &&
        drafts.map((draft: Blog) => <DraftsCard key={draft.id} blog={draft} />)}
    </div>
  );
}
