/* eslint-disable @next/next/no-img-element */
"use client";

import { FormEvent, useEffect, useState } from "react";
import TiptapEditor from "../../../../../components/TipTapEditor";
import { toast } from "sonner";
import EditDraftActions from "../../../../../components/EditDraftActions";
import { useRouter } from "next/navigation";
import { Blog } from "../../../../../types";

export default function EditDraft({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [draft, setDraft] = useState<Blog>();

  async function fetchDraft(id: string) {
    const response = await fetch(`/api/blogs/draft?id=${id}`);
    const data = await response.json();

    if (response.ok) {
      setDraft(data);
      setPreview(data.thumbnail);
      setContent(data.body);

      setUpdate({ ...update, title: data.title });
      return;
    }

    return toast.error(data.msg);
  }

  useEffect(() => {
    fetchDraft(params.id);
  }, []);

  const [content, setContent] = useState<{ content: string }>();
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
      const s3Response = await fetch(`/api/s3-upload?draftId=${draft?.id}`);

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

        type === "publish"
          ? router.replace("/blogs")
          : router.replace("/blogs/drafts");
        router.refresh();
        return;
      }

      router.refresh();
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
                    : `https://d3cr7gxsw8m9yz.cloudfront.net/${preview}`
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
          <TiptapEditor
            blog={draft}
            content={content?.content}
            onChange={setContent}
          />
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
