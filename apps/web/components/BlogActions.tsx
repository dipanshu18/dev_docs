"use client";
import { FaFire, FaHeart, FaThumbsUp } from "react-icons/fa6";

export default function BlogActions({
  giveLike,
  giveHeart,
  giveFire,
  blogId,
  userId,
}: any) {
  return (
    <>
      {/*  <!-- Action icon buttons --> */}
      <div className="flex gap-5 items-center my-5">
        <button className="btn btn-primary">
          <FaHeart />
          {giveHeart(blogId, userId)}
        </button>
        <button className="btn btn-primary">
          <FaThumbsUp />
          {giveLike(blogId, userId)}
        </button>
        <button className="btn btn-primary">
          <FaFire />
          {giveFire(blogId, userId)}
        </button>
      </div>
    </>
  );
}
