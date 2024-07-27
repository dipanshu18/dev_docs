import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

const client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  region: process.env.AWS_REGION!,
});

export async function GET(req: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user) {
    return NextResponse.json({ msg: "Please login!" });
  }

  const draftId = req.nextUrl.searchParams.get("draftId");

  if (draftId) {
    const draft = await prisma.blog.findUnique({
      where: { id: draftId, published: false },
      select: { thumbnail: true },
    });

    if (!draft) {
      return NextResponse.json({ msg: "Draft not exists" }, { status: 404 });
    }

    const key = draft.thumbnail;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      ContentType: "image/jpeg",
    });

    const url = await getSignedUrl(client, command);

    return NextResponse.json({ url, key });
  } else {
    const key = `thumbnails/${session.user.email}/${crypto.randomUUID()}.jpg`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      ContentType: "image/jpeg",
    });

    const url = await getSignedUrl(client, command);

    return NextResponse.json({ url, key });
  }
}
