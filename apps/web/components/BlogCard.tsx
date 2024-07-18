import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export default function BlogCard({
  type,
  blog,
}: {
  type: "user" | "all";
  blog: any;
}) {
  return (
    <div className="card bg-base-300 w-full shadow-xl">
      <figure>
        <img
          src={`https://devdocs-thumbnails.s3.ap-south-1.amazonaws.com/${blog.thumbnail}`}
          alt={blog.title + " thumbnail"}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{blog.title}</h2>
        <div className="card-actions justify-end">
          <Link
            href={
              type === "user"
                ? `/blogs/your-blogs/${blog.id}`
                : `/blogs/${blog.id}`
            }
          >
            <button className="btn btn-primary">Read more</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
