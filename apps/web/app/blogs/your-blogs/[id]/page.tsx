/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import UserBlogActions from "../../../../components/UserBlogActions";
import { prisma } from "../../../../lib/prisma";
import BlogActions from "../../../../components/BlogActions";

async function fetchUserBlog(id: string) {
  const userBlog = await prisma.blog.findUnique({
    where: {
      id,
    },
    include: {
      likes: true,
      hearts: true,
      fires: true,
    },
  });

  return userBlog;
}

export default async function YourBlogDetail({
  params,
}: {
  params: { id: string };
}) {
  const userBlog = await fetchUserBlog(params.id);

  if (!userBlog) {
    return (
      <div>
        <h1>Blog not found...</h1>
      </div>
    );
  }

  return (
    <div className="m-10 mockup-code">
      <Image
        src={`https://d3cr7gxsw8m9yz.cloudfront.net/${userBlog.thumbnail}`}
        alt={userBlog.title + " thumbnail"}
        width={1000}
        height={420}
        className="w-full"
        priority
        quality={100}
      />
      <div className="px-10 grid grid-cols-1">
        <div>
          <h1 className="my-5 text-5xl font-extrabold">{userBlog.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: userBlog.body }} />
        </div>
      </div>
      {/*<!-- End Social story card --> */}

      <div className="px-10">
        <BlogActions
          likes={userBlog.likes.length}
          hearts={userBlog.hearts.length}
          fires={userBlog.fires.length}
          id={userBlog.id}
        />
      </div>

      <UserBlogActions blog={userBlog} />
    </div>
  );
}
