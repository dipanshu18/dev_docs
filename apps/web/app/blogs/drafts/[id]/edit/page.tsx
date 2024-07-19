/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import TiptapEditor from "../../../../../components/TipTapEditor";
import { toast } from "sonner";

interface Draft {
  id: string;
  title: string;
  thumbnail: string;
  body: string;
  userId: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default function EditDraft({ params }: { params: { id: string } }) {
  const [draft, setDraft] = useState<Draft | null>();

  async function fetchDraft(id: string) {
    const response = await fetch(`/api/blogs/draft?id=${id}`);
    const draft = await response.json();

    if (response.ok) {
      setDraft(draft);
      setPreview(draft.thumbnail);
      setContent(draft.body);
      return;
    }

    return toast.error(draft.msg);
  }

  useEffect(() => {
    fetchDraft(params.id);
  }, []);

  const [content, setContent] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  // const [loading, setLoading] = useState(false);

  if (!draft) {
    return;
  }

  return (
    <div className="m-10 mockup-code">
      <form className="p-10 space-y-10">
        <div className="form-control">
          <label>Blog Thumbnail</label>

          {preview && (
            <div className="form-control my-5">
              <img
                src={`https://devdocs-thumbnails.s3.ap-south-1.amazonaws.com/${preview}`}
                alt="Thumbnail Preview"
                className="w-full"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            className="file-input w-full max-w-xl"
          />
        </div>

        <hr />

        <div className="form-control">
          <input
            value={draft?.title!}
            className="input border-none bg-transparent w-full pr-12 text-5xl outline-none  focus-visible:outline-none disabled:cursor-not-allowed"
          />
        </div>

        <div className="form-control">
          <TiptapEditor blog={draft} content={content} onChange={setContent} />
        </div>

        <div className="form-control flex flex-row my-10 gap-5">
          <button className="btn btn-outline">Save as draft</button>
          <button className="btn btn-success">Publish</button>
          <button className="btn">Delete</button>
        </div>
      </form>
    </div>
  );
}
