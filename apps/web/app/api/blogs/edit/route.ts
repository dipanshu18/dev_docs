import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

interface Data {
  title: string;
  thumbnailUrl: string;
  content: string;
  type: "draft" | "publish";
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user) {
    return NextResponse.json({ msg: "Please login!" });
  }

  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { msg: "Please provide blog id" },
      { status: 400 }
    );
  }

  const data: Data = await request.json();

  const updates: {
    thumbnail?: string;
    title?: string;
    body?: string;
    published?: boolean;
  } = {};

  if (data.thumbnailUrl) updates["thumbnail"] = data.thumbnailUrl;
  if (data.title) updates["title"] = data.title;
  if (data.content) updates["body"] = data.content;
  if (data.type) updates["published"] = data.type === "publish" ? true : false;

  const updatedBlog = await prisma.blog.update({
    where: {
      id,
    },
    data: updates,
  });

  if (updatedBlog) {
    return NextResponse.json({ msg: "Draft modified" }, { status: 201 });
  }

  return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
}
