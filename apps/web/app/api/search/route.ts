import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(req: NextRequest) {
  const searchTerm = req.nextUrl.searchParams.get("blog");

  if (searchTerm) {
    const result = await prisma.blog.findMany({
      where: {
        title: {
          contains: searchTerm,
          mode: "insensitive", // Case-insensitive search
        },
        published: true,
      },
      select: {
        id: true,
        title: true,
      },
    });

    if (result.length === 0) {
      return NextResponse.json({ msg: "No results found" }, { status: 404 });
    }

    return NextResponse.json(result);
  }

  return NextResponse.json({ msg: "Provide search term!" }, { status: 400 });
}
