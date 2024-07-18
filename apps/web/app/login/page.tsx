import { getServerSession } from "next-auth";
import ContinueWithGitHubBtn from "../../components/ContinueWithGitHubBtn";
import ContinueWithGoogleBtn from "../../components/ContinueWithGoogleBtn";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getServerSession();

  if (session) {
    return redirect("/blogs");
  }

  return (
    <div className="text-center max-w-xl mx-auto">
      <div className="m-10">
        <h1 className="my-10 text-3xl font-bold">Login</h1>
        <div className="flex flex-col gap-10 p-10 bg-base-300 rounded-lg">
          <ContinueWithGitHubBtn />
          <ContinueWithGoogleBtn />
        </div>
      </div>
    </div>
  );
}
