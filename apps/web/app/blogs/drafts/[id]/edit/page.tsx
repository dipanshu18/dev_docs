/* eslint-disable @next/next/no-img-element */
"use client";

import { FormEvent, useEffect, useState } from "react";
import TiptapEditor from "../../../../../components/TipTapEditor";
import { toast } from "sonner";
import EditDraftActions from "../../../../../components/EditDraftActions";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const [draft, setDraft] = useState<Draft>();

  async function fetchDraft(id: string) {
    const response = await fetch(`/api/blogs/draft?id=${id}`);
    const draft = await response.json();

    if (response.ok) {
      setDraft(draft);
      setPreview(draft.thumbnail);
      setContent(draft.body);
      setUpdate({ ...update, title: draft.title });
      return;
    }

    return toast.error(draft.msg);
  }

  useEffect(() => {
    fetchDraft(params.id);
  }, []);

  const [content, setContent] = useState<{ content?: string }>();
  const [preview, setPreview] = useState<string | null>(null);
  const [update, setUpdate] = useState<{
    thumbnail: undefined | File | string;
    title: string;
    content: string;
    type: "draft" | "publish";
  }>({
    thumbnail: undefined,
    title: "",
    content: "",
    type: "draft",
  });
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<"draft" | "publish">("draft");

  if (!draft) {
    return;
  }

  function handleThumbnailChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]!;

      // Check file size
      if (file.size > 3 * 1024 * 1024) {
        toast.error("File size should be less than 3 MB");
        return;
      }

      const img = new Image();
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result) {
          img.src = event.target.result as string;

          img.onload = () => {
            if (img.width !== 1000 || img.height !== 420) {
              toast.error("Image dimensions should be 1000x420");
              return;
            }

            setUpdate({ ...update, thumbnail: file });
            setPreview(URL.createObjectURL(file));
          };
        }
      };

      reader.readAsDataURL(file);
    }
  }

  async function handleEditDraft(e: FormEvent) {
    e.preventDefault();

    const blogData: {
      title?: string;
      content?: string;
      type?: "draft" | "publish";
      thumbnailUrl?: undefined | string;
    } = {};

    setLoading(true);

    if (update.thumbnail && update.thumbnail instanceof File) {
      const s3Response = await fetch(
        `/api/s3-upload?fileName=${update.thumbnail.name}`
      );

      const response = await s3Response.json();
      if (s3Response.ok) {
        const uploadResponse = await fetch(response.url, {
          method: "PUT",
          headers: {
            "Content-Type": update.thumbnail.type,
          },
          body: update.thumbnail,
        });

        if (!uploadResponse.ok) {
          return toast.error("Thumbnail upload failed!");
        }

        blogData["thumbnailUrl"] = await response.key;
      } else {
        setLoading(false);
        return toast.error("Something went wrong!");
      }
    }

    blogData["title"] = update.title;
    content ? (blogData["content"] = content.content) : "";
    blogData["type"] = type;

    if (draft) {
      const response = await fetch(`/api/blogs/edit?id=${draft.id}`, {
        method: "PUT",
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        type === "publish"
          ? toast.success("Blog created successfully!")
          : toast.success("Draft saved!");

        setLoading(false);
        router.refresh();
        type === "publish" ? router.push("/blogs") : "";
        return;
      }

      setLoading(false);
      return toast.error("Something went wrong!");
    }
  }

  return (
    <div className="m-10 mockup-code">
      <form onSubmit={handleEditDraft} className="p-10 space-y-10">
        <div className="form-control">
          <label>Blog Thumbnail</label>

          {preview && (
            <div className="form-control my-5">
              <img
                src={
                  update.thumbnail
                    ? preview
                    : `https://devdocs-thumbnails.s3.ap-south-1.amazonaws.com/${preview}`
                }
                alt="Thumbnail Preview"
                className="w-full"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg"
            onChange={handleThumbnailChange}
            className="file-input w-full max-w-xl"
          />
        </div>

        <hr />

        <div className="form-control">
          <input
            value={update.title!}
            onChange={(e) => setUpdate({ ...update, title: e.target.value })}
            className="input border-none bg-transparent w-full pr-12 text-5xl outline-none  focus-visible:outline-none disabled:cursor-not-allowed"
          />
        </div>

        <div className="form-control">
          <TiptapEditor blog={draft} content={content} onChange={setContent} />
        </div>

        <div className="form-control flex flex-row my-10 gap-5">
          <button
            disabled={loading}
            onClick={() => setType("draft")}
            className="btn btn-outline"
          >
            Save as draft
          </button>
          <button
            disabled={loading}
            onClick={() => setType("publish")}
            className="btn btn-success"
          >
            Publish
          </button>
          <EditDraftActions draft={draft} />
        </div>
      </form>
    </div>
  );
}
