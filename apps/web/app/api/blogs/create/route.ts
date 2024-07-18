import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { z } from "zod";

const BlogData = z.object({
  thumbnailUrl: z.string(),
  title: z.string(),
  content: z.string(),
  type: z.enum(["publish", "draft"]),
});

export async function POST(request: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user) {
    return NextResponse.json({ msg: "Please login!" });
  }

  const data = await request.json();
  const result = BlogData.safeParse(data);

  if (!result.success) {
    return NextResponse.json(
      { msg: "Please provide all the fields!" },
      { status: 400 }
    );
  }

  const blog = result.data;

  const newBlog = await prisma.blog.create({
    data: {
      thumbnail: blog.thumbnailUrl,
      title: blog.title,
      body: blog.content,
      published: blog.type === "publish" ? true : false,
      user: {
        connect: {
          email: session.user.email!,
        },
      },
    },
  });

  if (newBlog) {
    return NextResponse.json({ msg: "Blog created" }, { status: 201 });
  }

  return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
}
