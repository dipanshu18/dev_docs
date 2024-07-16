"use client";

import { useRouter } from "next/navigation";
import TiptapEditor from "../../../components/TipTapEditor";
import { useState } from "react";

export default function WriteBlog() {
  const router = useRouter();

  const [content, setContent] = useState("Let's start with...");

  console.log(content);

  return (
    <div className="m-10 mockup-code">
      <form className="p-10 space-y-10">
        <div className="form-control">
          <label>Blog Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            className="file-input w-full max-w-xl"
          />
        </div>
        <div className="form-control">
          <input
            placeholder="Title"
            className="input border-none bg-transparent w-full pr-12 text-5xl outline-none  focus-visible:outline-none disabled:cursor-not-allowed"
          />
        </div>

        <div className="form-control">
          <TiptapEditor content={content} onChange={setContent} />
        </div>

        <div className="form-control flex flex-row my-10 gap-5">
          <button className="btn btn-outline">Save as draft</button>
          <button className="btn btn-success">Publish</button>
          <button className="btn" onClick={() => router.push("/blogs")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
