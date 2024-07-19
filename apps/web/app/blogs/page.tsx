import Image from "next/image";
import BlogCard from "../../components/BlogCard";
import { prisma } from "../../lib/prisma";

import BlogsEmpty from "../../public/NoBlogsHome.jpg";

async function fetchBlogs() {
  const blogs = await prisma.blog.findMany({
    where: {
      published: true,
    },
  });

  return blogs;
}

export default async function Blogs() {
  const blogs = await fetchBlogs();

  if (blogs.length < 1) {
    return (
      <div className="grid grid-cols-1 place-items-center gap-2 m-10">
        <h1 className="text-3xl text-center font-bold">No blogs...</h1>
        <Image
          className="rounded-full"
          src={BlogsEmpty}
          width={300}
          height={300}
          alt="Blogs empty thumbnail"
        />
      </div>
    );
  }
  return (
    <>
      <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center p-5 gap-10">
        {blogs &&
          blogs.map((blog) => (
            <BlogCard type="all" key={blog.id} blog={blog} />
          ))}
      </div>
    </>
  );
}
