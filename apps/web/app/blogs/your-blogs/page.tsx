import { getServerSession } from "next-auth";
import BlogCard from "../../../components/BlogCard";
import { prisma } from "../../../lib/prisma";

import ProfileBlogsEmpty from "../../../public/profileBlogsEmpty.jpg";
import Image from "next/image";

async function fetchUserBlogs(email: string) {
  const userBlogs = await prisma.blog.findMany({
    where: {
      user: {
        email,
      },
      published: true,
    },
  });

  return userBlogs;
}

export default async function YourBlogs() {
  const session = await getServerSession();

  const userBlogs = await fetchUserBlogs(session?.user?.email!);

  if (userBlogs.length < 1) {
    return (
      <div className="grid grid-cols-1 place-items-center gap-2 m-10">
        <h1 className="text-3xl text-center font-bold">
          You have not published any blogs
        </h1>
        <Image
          className="rounded-full"
          src={ProfileBlogsEmpty}
          width={300}
          height={300}
          alt="Profile blogs empty thumbnail"
          priority
          quality={100}
        />
      </div>
    );
  }

  return (
    <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center p-5 gap-10">
      {userBlogs &&
        userBlogs.map((blog) => (
          <BlogCard type="user" key={blog.id} blog={blog} />
        ))}
    </div>
  );
}
