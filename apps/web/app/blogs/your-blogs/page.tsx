import { getServerSession } from "next-auth";
import BlogCard from "../../../components/BlogCard";
import { prisma } from "../../../lib/prisma";

async function fetchUserBlogs(email: string) {
  const userBlogs = await prisma.blog.findMany({
    where: {
      user: {
        email,
      },
    },
  });

  return userBlogs;
}

export default async function YourBlogs() {
  const session = await getServerSession();

  const userBlogs = await fetchUserBlogs(session?.user?.email!);

  if (userBlogs.length < 1) {
    return (
      <div className="text-center my-10">
        <h1 className="text-4xl font-bold">
          Nothing to show kindly publish blogs...
        </h1>
      </div>
    );
  }

  return (
    <div className="my-5 grid grid-cols-1 md:grid-cols-2 place-items-center p-5 gap-10">
      {userBlogs &&
        userBlogs.map((blog) => (
          <BlogCard type="user" key={blog.id} blog={blog} />
        ))}
    </div>
  );
}
