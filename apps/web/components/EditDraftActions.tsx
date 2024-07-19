"use client";

import { useState } from "react";
import { deleteBlog } from "../lib/actions/draft";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface EditDraftActionsProps {
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

export default function EditDraftActions({ draft }: EditDraftActionsProps) {
  const [actionLoading, setActionLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setActionLoading(true);
    const deleted = await deleteBlog(draft);

    if (deleted) {
      toast.success("Draft deleted!");
      setActionLoading(false);
      router.push("/blogs/drafts");
      router.refresh();
      return;
    }

    setActionLoading(false);
    return toast.error("Something went wrong!");
  }

  return (
    <button disabled={actionLoading} onClick={handleDelete} className="btn">
      Delete
    </button>
  );
}
