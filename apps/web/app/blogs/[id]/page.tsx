import Image from "next/image";
import { prisma } from "../../../lib/prisma";

async function fetchBlog(id: string) {
  const blog = await prisma.blog.findUnique({
    where: {
      id,
    },
  });

  const user = await prisma.blog.findUnique({
    where: {
      id,
    },
    select: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  return { blog, user };
}

export default async function BlogDetail({
  params,
}: {
  params: { id: string };
}) {
  const { blog, user } = await fetchBlog(params.id);

  if (!blog) {
    return (
      <div>
        <h1>No blog found!</h1>
      </div>
    );
  }

  return (
    <div className="m-10 mockup-code">
      <Image
        src={`https://devdocs-thumbnails.s3.ap-south-1.amazonaws.com/${blog.thumbnail}`}
        alt={blog.title + " thumbnail"}
        width={500}
        height={500}
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

      {/* <div className="px-10 ">
        <BlogActions likes={likes} hearts={hearts} fires={fires} id={blog.id} />
      </div> */}

      {/*  <!-- Header--> */}
      <div className="p-10">
        <header className="flex gap-4">
          <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full text-white">
            <Image
              src={user?.user.image!}
              alt={user?.user?.name!}
              width={48}
              height={48}
              className="max-w-full rounded-full"
            />
          </span>
          <div>
            <h3 className="text-xl font-medium">{user?.user?.name!}</h3>
            <p className="text-sm text-slate-400">
              {blog.createdAt.toDateString()}
            </p>
          </div>
        </header>
      </div>
    </div>
  );
}
