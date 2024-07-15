import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export default function BlogCard({ type }: { type: "user" | "all" }) {
  return (
    <div className="card bg-base-300 w-full shadow-xl">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Blog Title</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <Link href={type === "user" ? "/blogs/your-blogs/:id" : "/blogs/:id"}>
            <button className="btn btn-primary">Read more</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
