"use client";

import Link from "next/link";
import { deleteBlog, publishUnpublishBlog } from "../lib/actions/draft";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface DraftProps {
  draft: {
    id: string;
    title: string;
    thumbnail: string;
    body: string;
    userId: string;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
}

export default function DraftActions({ draft }: DraftProps) {
  const router = useRouter();

  async function handlePublish() {
    const published = await publishUnpublishBlog(draft);

    if (published) {
      toast.success("Blog published!");
      router.push("/blogs");
      router.refresh();
      return;
    }

    return toast.error("Something went wrong!");
  }

  async function handleDelete() {
    const deleted = await deleteBlog(draft);

    if (deleted) {
      toast.success("Blog deleted!");
      router.push("/blogs/drafts");
      router.refresh();
      return;
    }

    return toast.error("Something went wrong!");
  }

  return (
    <div className="px-10 flex gap-5 items-center my-5">
      <button onClick={handlePublish} className="btn btn-success">
        Publish
      </button>
      <Link href={`/blogs/drafts/${draft.id}/edit`}>
        <button className="btn btn-primary">Edit</button>
      </Link>
      <button onClick={handleDelete} className="btn btn-warning">
        Delete
      </button>
    </div>
  );
}
