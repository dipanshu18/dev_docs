"use client";
import { FaFire, FaHeart, FaThumbsUp } from "react-icons/fa6";

export default function BlogActions({
  // id,
  likes,
  hearts,
  fires,
}: {
  id: string;
  likes: number;
  hearts: number;
  fires: number;
}) {
  return (
    <>
      {/*  <!-- Action icon buttons --> */}
      <div className="flex gap-5 items-center my-5">
        <button className="btn btn-primary">
          <FaHeart />
          {hearts}
        </button>
        <button className="btn btn-primary">
          <FaThumbsUp />
          {likes}
        </button>
        <button className="btn btn-primary">
          <FaFire />
          {fires}
        </button>
      </div>
    </>
  );
}
