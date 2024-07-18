/* eslint-disable @next/next/no-img-element */
import { FaFire, FaHeart, FaThumbsUp } from "react-icons/fa6";
import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth";

async function fetchBlog(id: string) {
  const blog = await prisma.blog.findUnique({
    where: {
      id,
    },
  });

  return blog;
}

export default async function BlogDetail({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession();
  const blog = await fetchBlog(params.id);

  if (!blog) {
    return (
      <div>
        <h1>No blog found!</h1>
      </div>
    );
  }

  return (
    <div className="m-10 mockup-code">
      <img
        src={`https://devdocs-thumbnails.s3.ap-south-1.amazonaws.com/${blog.thumbnail}`}
        alt={blog.title + " thumbnail"}
        className="w-full"
      />
      <div className="px-10 grid grid-cols-1">
        {/*  <!-- Body--> */}
        <div>
          <h1 className="my-5 text-5xl font-extrabold">{blog.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: blog.body }} />
        </div>
      </div>
      {/*<!-- End Social story card --> */}

      <div className="px-10 ">
        {/*  <!-- Action icon buttons --> */}
        <div className="flex gap-5 items-center my-5">
          <button className="btn btn-primary">
            <FaHeart />
            12
          </button>
          <button className="btn btn-primary">
            <FaThumbsUp />
            12
          </button>
          <button className="btn btn-primary">
            <FaFire />
            12
          </button>
        </div>

        {/*  <!-- Header--> */}
        <div>
          <header className="flex gap-4">
            <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full text-white">
              <img
                src={session?.user?.image!}
                alt={session?.user?.name!}
                width="48"
                height="48"
                className="max-w-full rounded-full"
              />
            </span>
            <div>
              <h3 className="text-xl font-medium">{session?.user?.name!}</h3>
              <p className="text-sm text-slate-400">
                {blog.createdAt.toDateString()}
              </p>
            </div>
          </header>
        </div>
      </div>
    </div>
  );
}
