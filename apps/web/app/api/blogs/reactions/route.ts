import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function PUT(req: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user) {
    return NextResponse.json({ msg: "Please login!" }, { status: 401 });
  }

  const { blogId, userId, type } = await req.json();

  const alreadyLiked = await prisma.like.findFirst({
    where: {
      blogId,
      userId,
    },
  });

  const alreadyHeart = await prisma.heart.findFirst({
    where: {
      blogId,
      userId,
    },
  });

  const alreadyFire = await prisma.fire.findFirst({
    where: {
      blogId,
      userId,
    },
  });

  switch (type) {
    case "like":
      if (alreadyLiked) {
        await prisma.like.delete({
          where: {
            id: alreadyLiked.id,
          },
        });

        return NextResponse.json({}, { status: 200 });
      } else {
        await prisma.like.create({
          data: {
            blogId,
            userId,
          },
        });

        return NextResponse.json({}, { status: 200 });
      }

    case "heart":
      if (alreadyHeart) {
        await prisma.heart.delete({
          where: {
            id: alreadyHeart.id,
          },
        });
        return NextResponse.json({}, { status: 200 });
      } else {
        await prisma.heart.create({
          data: {
            blogId,
            userId,
          },
        });
        return NextResponse.json({}, { status: 200 });
      }

    case "fire":
      if (alreadyFire) {
        await prisma.fire.delete({
          where: {
            id: alreadyFire.id,
          },
        });
        return NextResponse.json({}, { status: 200 });
      } else {
        await prisma.fire.create({
          data: {
            blogId,
            userId,
          },
        });
        return NextResponse.json({}, { status: 200 });
      }
  }

  NextResponse.json({}, { status: 200 });
}
