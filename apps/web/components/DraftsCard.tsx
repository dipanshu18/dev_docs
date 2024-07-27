/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function DraftsCard({ blog }: any) {
  return (
    <div className="card bg-base-300 w-full shadow-xl">
      <figure>
        <img
          src={`https://devdocs-thumbnails.s3.ap-south-1.amazonaws.com/${blog.thumbnail}`}
          alt={blog.title + " thumbnail"}
          className="w-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{blog.title}</h2>
        <div className="card-actions mt-5">
          <Link href={`/blogs/drafts/${blog.id}`}>
            <button className="btn btn-primary">Read more</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
