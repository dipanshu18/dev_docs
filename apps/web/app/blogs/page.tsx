import BlogCard from "../../components/BlogCard";
import { prisma } from "../../lib/prisma";

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
      <div className="text-center my-10">
        <h1 className="text-4xl font-bold">
          Nothing to show kindly publish blogs to see on the main page...
        </h1>
      </div>
    );
  }
  return (
    <>
      <div className="my-5 grid grid-cols-1 md:grid-cols-2 place-items-center p-5 gap-10">
        {blogs &&
          blogs.map((blog) => (
            <BlogCard type="all" key={blog.id} blog={blog} />
          ))}
      </div>
    </>
  );
}
