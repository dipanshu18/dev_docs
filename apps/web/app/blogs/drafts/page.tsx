import DraftsCard from "../../../components/DraftsCard";
import { prisma } from "../../../lib/prisma";

async function fetchDrafts() {
  const drafts = await prisma.blog.findMany({
    where: {
      published: false,
    },
  });

  return drafts;
}

export default async function Drafts() {
  const drafts = await fetchDrafts();
  console.log(drafts);
  if (drafts.length < 1) {
    return (
      <div className="text-center my-10">
        <h1 className="text-4xl font-bold">Nothing to show...</h1>
      </div>
    );
  }

  return (
    <div className="my-5 grid grid-cols-1 md:grid-cols-2 place-items-center p-5 gap-10">
      {drafts &&
        drafts.map((draft) => <DraftsCard key={draft.id} blog={draft} />)}
    </div>
  );
}
