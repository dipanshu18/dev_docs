"use client";

import { signIn } from "next-auth/react";
import { FaSquareGithub } from "react-icons/fa6";

export default function ContinueWithGitHubBtn() {
  return (
    <button
      onClick={async () => await signIn("github")}
      className="btn btn-primary"
    >
      <FaSquareGithub />
      Continue with Github
    </button>
  );
}
