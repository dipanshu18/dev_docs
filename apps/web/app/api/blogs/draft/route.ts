import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json(
      { msg: "Unauthorized! Please login" },
      { status: 401 }
    );
  }

  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { msg: "Please provide blog id!" },
      { status: 411 }
    );
  }

  const draft = await prisma.blog.findUnique({
    where: {
      id,
    },
  });

  if (!draft) {
    return NextResponse.json({ msg: "Draft not found" }, { status: 404 });
  }

  return NextResponse.json(draft);
}
