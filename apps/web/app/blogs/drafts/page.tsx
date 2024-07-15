import DraftsCard from "../../../components/DraftsCard";

export default function Drafts() {
  return (
    <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center p-5 gap-10">
      <DraftsCard />
      <DraftsCard />
      <DraftsCard />
      <DraftsCard />
    </div>
  );
}
