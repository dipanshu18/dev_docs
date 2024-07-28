import Image from "next/image";
import { prisma } from "../../../lib/prisma";
import BlogActions from "../../../components/BlogActions";
import BlogComment from "../../../components/BlogComment";
import CommentBubble from "../../../components/CommentBubble";

interface Comment {
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
  id: string;
  body: string;
  replies: {
    user: {
      id: string;
      name: string | null;
      image: string | null;
    };
    id: string;
    body: string;
  }[];
}

async function fetchBlog(id: string) {
  const blog = await prisma.blog.findUnique({
    where: {
      id,
    },
    include: {
      likes: true,
      hearts: true,
      fires: true,
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      comments: {
        select: {
          id: true,
          body: true,
          replies: {
            select: {
              id: true,
              body: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });

  return blog;
}

export default async function BlogDetail({
  params,
}: {
  params: { id: string };
}) {
  const blog = await fetchBlog(params.id);

  if (!blog) {
    return (
      <div>
        <h1>No blog found!</h1>
      </div>
    );
  }

  return (
    <>
      <div className="m-10 mockup-code bg-gray-800">
        <Image
          src={`https://devdocs-thumbnails.s3.ap-south-1.amazonaws.com/${blog.thumbnail}`}
          alt={blog.title + " thumbnail"}
          width={500}
          height={500}
          className="w-full"
          priority
          quality={100}
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
          <BlogActions
            likes={blog.likes.length}
            hearts={blog.hearts.length}
            fires={blog.fires.length}
            id={blog.id}
          />
        </div>

        {/*  <!-- Header--> */}
        <div className="p-10">
          <header className="flex gap-4">
            <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full text-white">
              <Image
                src={blog.user.image!}
                alt={blog.user.name!}
                width={48}
                height={48}
                className="max-w-full rounded-full"
              />
            </span>
            <div>
              <h3 className="text-xl font-medium">{blog.user.name!}</h3>
              <p className="text-sm text-slate-400">
                {blog.createdAt.toDateString()}
              </p>
            </div>
          </header>
        </div>
      </div>

      <div className="m-10 p-10 bg-gray-800 rounded-2xl">
        <BlogComment id={blog.id} />

        <div className="mt-5">
          {blog.comments.map((comment: Comment) => (
            <CommentBubble
              key={comment.id}
              comment={comment}
              blogId={blog.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}
