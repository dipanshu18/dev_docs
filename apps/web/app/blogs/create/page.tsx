/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import TiptapEditor from "../../../components/TipTapEditor";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function WriteBlog() {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [blog, setBlog] = useState<{
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

            setBlog({ ...blog, thumbnail: file });
            setPreview(URL.createObjectURL(file));
          };
        }
      };

      reader.readAsDataURL(file);
    }
  }

  async function handleCreateBlog(e: FormEvent) {
    e.preventDefault();

    const blogData: {
      title?: string;
      content?: string;
      type?: "draft" | "publish";
      thumbnailUrl?: undefined | string;
    } = {};

    setLoading(true);

    if (blog.thumbnail && blog.thumbnail instanceof File) {
      const s3Response = await fetch(
        `/api/s3-upload?fileName=${blog.thumbnail.name}`
      );

      const response = await s3Response.json();
      if (s3Response.ok) {
        const uploadResponse = await fetch(response.url, {
          method: "PUT",
          headers: {
            "Content-Type": blog.thumbnail.type,
          },
          body: blog.thumbnail,
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

    blogData["title"] = blog.title;
    blogData["content"] = blog.content;
    blogData["type"] = blog.type;

    const response = await fetch("/api/blogs/create", {
      method: "POST",
      body: JSON.stringify(blogData),
    });

    if (response.ok) {
      blog.type === "publish"
        ? toast.success("Blog created successfully!")
        : toast.success("Blog saved as draft");

      setLoading(false);
      router.refresh();
      return router.push("/blogs");
    }

    setLoading(false);
    return toast.error("Something went wrong!");
  }

  return (
    <div className="m-10 mockup-code">
      <form
        id="create-blog"
        onSubmit={handleCreateBlog}
        className="p-10 space-y-10"
      >
        <div className="form-control ">
          <label className="mb-1">Blog Thumbnail</label>
          {preview && (
            <div className="form-control my-5">
              <img src={preview} alt="Thumbnail Preview" className="w-full" />
            </div>
          )}
          <input
            disabled={loading}
            type="file"
            name="thumbnail"
            accept="image/jpeg"
            required
            onChange={handleThumbnailChange}
            className="file-input w-full max-w-xl"
          />
        </div>
        <hr />
        <div className="form-control">
          <input
            placeholder="Title"
            name="title"
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
            required
            className="input border-none bg-transparent w-full pr-12 text-5xl outline-none focus-visible:outline-none disabled:cursor-not-allowed"
          />
        </div>
        <div className="form-control">
          <TiptapEditor content={blog.content} blog={blog} onChange={setBlog} />
        </div>

        <div className="form-control flex flex-row my-10 gap-5">
          <button
            disabled={loading}
            onClick={() => {
              setBlog({ ...blog, type: "draft" });
            }}
            className="btn btn-outline"
          >
            Save as draft
          </button>
          <button
            disabled={loading}
            onClick={() => {
              setBlog({ ...blog, type: "publish" });
            }}
            className="btn btn-success"
          >
            Publish
          </button>
          <button
            disabled={loading}
            className="btn"
            onClick={(e) => {
              e.preventDefault();
              router.push("/blogs");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
