"use client";

import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { addCommentBlog } from "../lib/actions/comment";
import { useRouter } from "next/navigation";

export default function BlogComment({ id }: { id: string }) {
  const session: any = useSession();
  const router = useRouter();

  const [comment, setComment] = useState("");

  async function handleComment(e: FormEvent) {
    e.preventDefault();

    const commentBody = {
      body: comment,
      blogId: id,
      userId: session.data?.user.id!,
    };

    await addCommentBlog(commentBody);
    setComment("");
    router.refresh();
  }

  return (
    <div className="flex gap-5">
      <input
        type="text"
        onChange={(e) => setComment(e.target.value)}
        placeholder="Type your comment here..."
        className="input input-bordered w-full"
      />
      <button onClick={handleComment} className="btn btn-primary">
        Comment
      </button>
    </div>
  );
}
