/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import UserBlogActions from "../../../../components/UserBlogActions";
import { prisma } from "../../../../lib/prisma";

async function fetchUserBlog(id: string) {
  const userBlog = await prisma.blog.findUnique({
    where: {
      id,
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
        src={`https://devdocs-thumbnails.s3.ap-south-1.amazonaws.com/${userBlog.thumbnail}`}
        alt={userBlog.title + " thumbnail"}
        width={1000}
        height={420}
        className="w-full"
      />
      <div className="px-10 grid grid-cols-1">
        <div>
          <h1 className="my-5 text-5xl font-extrabold">{userBlog.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: userBlog.body }} />
        </div>
      </div>
      {/*<!-- End Social story card --> */}

      <UserBlogActions blog={userBlog} />
    </div>
  );
}
