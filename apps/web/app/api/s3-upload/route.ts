import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  region: process.env.AWS_REGION!,
});

export async function GET(request: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user) {
    return NextResponse.json({ msg: "Please login!" });
  }

  const fileName = request.nextUrl.searchParams.get("fileName");

  const key = `thumbnails/${session.user.email}/${fileName}`;
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
    ContentType: "image/jpeg",
  });
  const url = await getSignedUrl(client, command);

  return NextResponse.json({ url, key });
}
