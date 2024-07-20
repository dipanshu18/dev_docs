"use server";

import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "../prisma";
import { client } from "../../app/api/s3-upload/route";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

interface Blog {
  id: string;
  title: string;
  thumbnail: string;
  body: string;
  userId: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export async function publishUnpublishBlog(blog: Blog) {
  const publishBlog = await prisma.blog.update({
    where: {
      id: blog.id,
    },
    data: {
      published: !blog.published,
    },
  });

  return publishBlog;
}

export async function deleteBlog(blog: Blog) {
  const blogExists = await prisma.blog.findUnique({
    where: {
      id: blog.id,
    },
  });

  if (blogExists) {
    const thumbnailKey = blogExists.thumbnail;

    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: thumbnailKey,
    });
    const url = await getSignedUrl(client, command);

    await fetch(url, { method: "DELETE" });

    const deletedBlog = await prisma.blog.delete({
      where: {
        id: blog.id,
      },
    });

    return deletedBlog;
  }

  return NextResponse.json(
    { msg: "Error while deleting blog!" },
    { status: 500 }
  );
}
