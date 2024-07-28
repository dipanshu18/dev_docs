"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";
import { FaFire, FaHeart, FaThumbsUp } from "react-icons/fa6";
import { toast } from "sonner";

interface BlogActionsProps {
  id: string;
  likes: number;
  hearts: number;
  fires: number;
}

export default function BlogActions({
  id,
  likes,
  hearts,
  fires,
}: BlogActionsProps) {
  const session: any = useSession();
  const router = useRouter();

  const type = useRef<"like" | "heart" | "fire">();

  async function handleReaction(e: FormEvent) {
    e.preventDefault();

    if (session) {
      await fetch("/api/blogs/reactions", {
        method: "PUT",
        body: JSON.stringify({
          blogId: id,
          userId: session.data?.user.id,
          type: type.current,
        }),
      });

      router.refresh();
      return;
    }

    return toast.error("Please Login!");
  }

  return (
    <>
      {/*  <!-- Action icon buttons --> */}
      <div className="flex gap-5 items-center my-5">
        <button
          onClick={(e) => {
            type.current = "heart";
            handleReaction(e);
          }}
          className="btn btn-primary"
        >
          <FaHeart />
          {hearts}
        </button>
        <button
          onClick={(e) => {
            type.current = "like";
            handleReaction(e);
          }}
          className="btn btn-primary"
        >
          <FaThumbsUp />
          {likes}
        </button>
        <button
          onClick={(e) => {
            type.current = "fire";
            handleReaction(e);
          }}
          className="btn btn-primary"
        >
          <FaFire />
          {fires}
        </button>
      </div>
    </>
  );
}
