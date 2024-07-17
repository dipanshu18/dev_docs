"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function ContinueWithGoogleBtn() {
  return (
    <button
      onClick={async () => await signIn("google")}
      className="btn btn-outline"
    >
      <FcGoogle />
      Continue with Google
    </button>
  );
}
