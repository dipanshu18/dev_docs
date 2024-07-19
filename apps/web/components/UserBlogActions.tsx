"use client";

import { useRouter } from "next/navigation";
import { deleteBlog, publishUnpublishBlog } from "../lib/actions/draft";
import { toast } from "sonner";

interface BlogProps {
  blog: {
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

export default function UserBlogActions({ blog }: BlogProps) {
  const router = useRouter();

  async function handleUnpublish() {
    const unpublished = await publishUnpublishBlog(blog);

    if (unpublished) {
      toast.success("Blog unpublished!");
      router.push("/blogs/drafts");
      router.refresh();
      return;
    }

    return toast.error("Something went wrong!");
  }

  async function handleDelete() {
    const deleted = await deleteBlog(blog);

    if (deleted) {
      toast.success("Blog deleted!");
      router.push("/blogs/your-blogs");
      router.refresh();
      return;
    }

    return toast.error("Something went wrong!");
  }

  return (
    <div className="px-10 flex gap-5 items-center my-5">
      <button onClick={handleUnpublish} className="btn btn-success">
        Unpublish
      </button>

      <button onClick={handleDelete} className="btn btn-warning">
        Delete
      </button>
    </div>
  );
}
