"use client";

import Image from "next/image";
import { useState } from "react";
import { addCommentReply } from "../lib/actions/comment";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface CommentProps {
  comment: {
    id: string;
    user: {
      id: string;
      name: string | null;
      image: string | null;
    };
    body: string;
    replies: {
      user: {
        id: string;
        name: string | null;
        image: string | null;
      };
      body: string;
    }[];
  };
  blogId: string;
}

export default function CommentBubble({ comment, blogId }: CommentProps) {
  const router = useRouter();
  const session: any = useSession();

  const [showReplyInput, setShowReplyInput] = useState(false);
  const [commentReply, setCommentReply] = useState("");

  async function handleReply() {
    const reply = {
      body: commentReply,
      commentId: comment.id,
      blogId: blogId,
      userId: session.data.user.id,
    };
    await addCommentReply(reply);

    setCommentReply("");
    setShowReplyInput(!showReplyInput);
    router.refresh();
  }

  return (
    <>
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <Image
              alt="User profile headshot"
              src={comment.user.image!}
              width={70}
              height={70}
              priority
              quality={100}
            />
          </div>
        </div>
        <div className="chat-bubble my-2 w-full bg-gray-700">
          <div className="text-sm font-extrabold">
            <strong>{comment.user.name}</strong>
          </div>
          <span className="text-lg">{comment.body}</span>
          <div>
            <button
              onClick={() => setShowReplyInput(!showReplyInput)}
              className="text-sm"
            >
              reply
            </button>
          </div>
        </div>
      </div>

      {showReplyInput && (
        <div className="flex gap-5 mt-2 w-full">
          <input
            type="text"
            onChange={(e) => setCommentReply(e.target.value)}
            placeholder="Type your reply here..."
            className="input input-bordered w-full"
          />
          <button onClick={handleReply} className="btn btn-primary">
            Reply
          </button>
        </div>
      )}

      <div>
        {comment.replies &&
          comment.replies.map((reply, index) => {
            return (
              <div key={index} className="chat chat-end my-2">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <Image
                      alt="User profile headshot"
                      src={reply.user.image!}
                      height={60}
                      width={60}
                      priority
                      quality={100}
                    />
                    <h2>{reply.user.name}</h2>
                  </div>
                </div>
                <div className="chat-bubble w-full bg-gray-900">
                  <div className="text-sm font-extrabold">
                    <strong>{reply.user.name}</strong>
                  </div>
                  <span className="text-lg">{reply.body}</span>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
