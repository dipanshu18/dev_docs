/* eslint-disable @next/next/no-img-element */
import { prisma } from "../../../../lib/prisma";
import DraftActions from "../../../../components/DraftActions";

async function fetchDraftBlog(id: string) {
  const draft = await prisma.blog.findUnique({
    where: {
      id,
    },
  });

  return draft;
}

export default async function DraftDetail({
  params,
}: {
  params: { id: string };
}) {
  const draft = await fetchDraftBlog(params.id);

  if (!draft) {
    return (
      <div>
        <h1>Draft not found...</h1>
      </div>
    );
  }

  return (
    <div className="m-10 mockup-code">
      <img
        src={`https://devdocs-thumbnails.s3.ap-south-1.amazonaws.com/${draft.thumbnail}`}
        alt={draft.title + " thumbnail"}
        className="w-full"
      />
      <div className="px-10 grid grid-cols-1">
        {/*  <!-- Body--> */}
        <div>
          <h1 className="my-5 text-5xl font-extrabold">{draft.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: draft.body }} />
        </div>
      </div>
      {/*<!-- End Social story card --> */}

      <DraftActions draft={draft} />
    </div>
  );
}
