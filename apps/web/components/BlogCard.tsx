import Image from "next/image";
import Link from "next/link";

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
        <Image
          src={`https://devdocs-thumbnails.s3.ap-south-1.amazonaws.com/${blog.thumbnail}`}
          alt={blog.title + " thumbnail"}
          width={1000}
          height={420}
          className="w-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{blog.title}</h2>
        <div className="card-actions mt-5">
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
