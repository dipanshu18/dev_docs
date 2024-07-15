import ContinueWithGoogleBtn from "../../../components/ContinueWithGoogleBtn";
import ContinueWithGitHubBtn from "../../../components/ContinueWithGitHubBtn";

export default function Login() {
  return (
    <div className="hero-content flex-col">
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Login</h1>
      </div>
      <div className="card bg-base-300 w-full max-w-xl shadow-2xl mt-5">
        <form className="card-body">
          <div className="form-control">
            <ContinueWithGoogleBtn />
          </div>
          <div className="form-control">
            <ContinueWithGitHubBtn />
          </div>
        </form>
      </div>
    </div>
  );
}
