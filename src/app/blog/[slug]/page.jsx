
import { getPost, getUser } from "@/lib/data";
import Image from "next/image"

export const generateMetadata = async ({ params }) => {
  const { slug } = params;
  const post = await getPost(slug);
  return {
    title: post.title,
    description: post.desc
  };
}
const getdata = async (slug) => {
  try {
    const response = await fetch(`http://localhost:3000/api/blog/${slug}`);
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error)
  }
}
const SinglePage = async ({ params }) => {
  const { slug } = params;
  // const post = await getPost(slug);
  const post = await getdata(slug);
  const user = await getUser(post.userId);
  return (
    <>
      {/* container */}
      <div className=" h-fit w-full md:flex gap-6 p-2 ">

        {/* image container */}
        <div className="md:h-screen h-[300px] md:w-[40%] relative">
          {post.img && <Image src="/post.png" alt="" fill className="object-contain md:object-top" />}
        </div>

        {/* text container */}
        <div className="md:h-screen md:w-[60%] flex flex-col gap-3 max-md:my-6 space-y-3 md:space-y-8">

          <h1 className="text-4xl font-semibold">{post.title}</h1>
          {
            <div className="flex gap-5 items-center">
              <div className="w-10 h-10 rounded-full relative">
                <Image src={user.img ? user.img : "/noavatar.png"} fill alt="" className="object-cover rounded-full" />
              </div>

              <div className="flex flex-col">
                <div className="font-bold text-gray-600">
                  Author
                </div>
                <span>
                  {user.username}
                </span>
              </div>
              <div className="flex flex-col">
                <div className="font-bold text-gray-600">
                  Published
                </div>
                <span>
                  {post.createdAt.toString().slice(0, 10)}
                </span>
              </div>
            </div>
          }

          <p>{post.desc}</p>
        </div>



      </div>
    </>
  )
}

export default SinglePage