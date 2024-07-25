"use server";

import { NextResponse } from "next/server";
import { prisma } from "../prisma";

interface UserComment {
  body: string;
  blogId: string;
  userId: string;
}

interface CommentReply {
  body: string;
  blogId: string;
  commentId: string;
  userId: string;
}

export async function addCommentBlog(comment: UserComment) {
  const addComment = await prisma.comment.create({
    data: {
      blogId: comment.blogId,
      userId: comment.userId,
      body: comment.body,
    },
  });

  return addComment;
}

export async function deleteCommentBlog(commentId: string) {
  const deletedComment = await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  return deletedComment;
}

export async function addCommentReply(reply: CommentReply) {
  const commentExists = await prisma.comment.findUnique({
    where: {
      id: reply.commentId,
    },
  });

  if (!commentExists) {
    return NextResponse.json({ msg: "Comment not exists!" }, { status: 404 });
  }

  const addReply = await prisma.reply.create({
    data: {
      body: reply.body,
      userId: reply.userId,
      blogId: reply.blogId,
      commentId: commentExists.id,
    },
  });

  return addReply;
}

export async function deleteCommentReplyBlog(
  commentId: string,
  replyId: string
) {
  const commentExists = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });

  if (!commentExists) {
    return NextResponse.json({ msg: "Comment not exists!" }, { status: 404 });
  }

  const deletedCommentReply = await prisma.reply.delete({
    where: {
      id: replyId,
    },
  });

  return deletedCommentReply;
}
