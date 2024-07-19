"use server";

import { prisma } from "../prisma";

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
  const deletedBlog = await prisma.blog.delete({
    where: {
      id: blog.id,
    },
  });

  return deletedBlog;
}
