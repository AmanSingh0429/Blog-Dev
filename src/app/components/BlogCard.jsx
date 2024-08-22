import Image from "next/image"
import Link from "next/link"

const BlogCard = ({ post }) => {

  return (
    <>

      <div className="rounded-lg h-fit m-1 p-2 w-[100%] sm:w-[50%] md:w-[45%] lg:w-[300px]" >
        <div className="flex">
          {post && <div className=" h-72 w-[90%] relative border-indigo-950 border">
            <Image src={post.img} alt="No Image to display" fill className="object-contain" />
          </div>}
          <span className="rotate-90 -translate-x-32 w-[10%] ">01.01.2024</span>
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <h1 className="text-lg font-semibold w-[90%]">
            {post.title}
          </h1>
          <p className="text-xs w-[90%]">{post.desc}</p>
          <Link href={`blog/${post.slug}`} className="hover:text-slate-200 underline">
            READ MORE
          </Link>
        </div>

      </div >
    </>
  )
}

export default BlogCard