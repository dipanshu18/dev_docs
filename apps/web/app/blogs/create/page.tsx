"use client";

import { useRouter } from "next/navigation";
import TiptapEditor from "../../../components/TipTapEditor";
import { useState } from "react";

export default function WriteBlog() {
  const router = useRouter();

  const [content, setContent] = useState(`<h1>Hello, world✨</h1>
    <p>Today we are gonna explore {tech stack}...</p>
    <pre><code>for (var i=1; i <= 20; i++)
{
  if (i % 15 == 0)
    console.log("FizzBuzz");
  else if (i % 3 == 0)
    console.log("Fizz");
  else if (i % 5 == 0)
    console.log("Buzz");
  else
    console.log(i);
}</code></pre>
    `);

  console.log(content);

  return (
    <div className="m-10 mockup-code">
      <form className="p-10 space-y-10">
        <div className="form-control ">
          <label className="mb-5">Blog Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            className="file-input w-full max-w-xl"
          />
        </div>
        <hr />
        <div className="form-control">
          <input
            placeholder="Title"
            className="input border-none bg-transparent w-full pr-12 text-5xl outline-none focus-visible:outline-none disabled:cursor-not-allowed"
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
