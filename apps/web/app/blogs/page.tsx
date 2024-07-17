import BlogCard from "../../components/BlogCard";

export default function Blogs() {
  return (
    <>
      <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center p-5 gap-10">
        <BlogCard type="all" />
        <BlogCard type="all" />
        <BlogCard type="all" />
        <BlogCard type="all" />
        <BlogCard type="all" />
        <BlogCard type="all" />
        <BlogCard type="all" />
        <BlogCard type="all" />
        <BlogCard type="all" />
        <BlogCard type="all" />
        <BlogCard type="all" />
      </div>
    </>
  );
}
