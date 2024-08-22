
import Link from "next/link";
import BlogCard from "../components/BlogCard"
import { MdOutlineLibraryAdd } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
// FETCHING DATA USING API
const getdata = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/blog", { cache: "no-store" });
    // const response = await fetch("https://jsonplaceholder.typicode.com/photos", { cache: "no-store" });

    const data = response.json();
    return data;
  } catch (error) {
    console.log(error, " error fetching post data")
  }
}
export const metadata = {
  title: "Blog"
}

const BlogPage = async () => {

  const posts = await getdata();

  // const posts = await getPosts();
  return (
    <>
      <div className="flex gap-5 flex-wrap m-5">
        {
          posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))
        }
      </div>

      <div className="flex max-sm:flex-col justify-end gap-2 fixed bottom-8 right-2 sm:right-8 sm:bottom-12">
        <Link href={"/create-post"} className="bg-white text-black rounded-md p-3 font-bold hover:bg-transparent hover:border hover:text-white sm:text-3xl group">
          <MdOutlineLibraryAdd className="group-hover:-translate-y-1 transition" />
        </Link>
        <Link href={"/profile"} className="bg-white text-black rounded-md p-3 font-bold hover:bg-transparent hover:border hover:text-white sm:text-3xl group">
          <MdAccountCircle className="group-hover:-translate-y-1 transition" />
        </Link>
      </div>

    </>
  )
}

export default BlogPage