"use client"
import { useSession } from "next-auth/react"
import { revalidatePath } from "next/cache"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"


const createPost = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const { register, formState: { errors, isSubmitting }, handleSubmit, setError } = useForm()
  const handleCreateBlog = async (details) => {
    const email = session.email
    const userId = session.userId
    const blogDetails = {
      ...details,
      email,
      userId
    }

    try {
      const res = await fetch("/api/blog/new",
        {
          method: 'POST',
          body: JSON.stringify(blogDetails)
        }
      )
      if (res.ok) {
        router.push("/blog")
        revalidatePath("/blog")
      }
    } catch (error) {
      setError("root", {
        message: error.message
      })
    }
  };

  return (
    <>
      <div className="h-full w-full flex justify-start items-center">
        <div className="h-full w-[700px] p-2 flex flex-col gap-6 rounded-md">

          <h1 className="text-5xl font-bold text-left m-4">Create New Blog </h1>
          <form className=" flex flex-col gap-5"
            onSubmit={handleSubmit(handleCreateBlog)}
          >
            <div>
              <label htmlFor="title">
                <input
                  placeholder="Blog Title"
                  type="text"
                  className="w-full p-3 text-sm rounded-md bg-[#212036]"
                  {
                  ...register("title", {
                    required: "Please input a title"
                  })
                  }
                />
              </label>
              <p className="text-red-600 text-sm">{errors.title?.message}</p>
            </div>
            <div>
              <label htmlFor="desc">
                <textarea
                  placeholder="Blog Description"
                  cols="30"
                  rows="10"
                  className="w-full p-3 text-sm rounded-md bg-[#212036]"
                  {
                  ...register("desc", {
                    required: "Please input a description"
                  })
                  }
                />
              </label>
              <p className="text-red-600 text-sm">{errors.desc?.message}</p>
            </div>
            <div>
              <label htmlFor="image">
                <input
                  type="file"
                  accept="image/*"
                  className="w-full p-3 text-sm rounded-md bg-[#212036]"
                  {...register("image", {
                    required: "Please upload an image"
                  })}
                />
              </label>
              <p className="text-red-600 text-sm">{errors.image?.message}</p>
            </div>
            <button
              disabled={isSubmitting}
              className="bg-blue-600 w-full rounded-lg  p-2 font-semibold text-lg hover:bg-blue-700 hover:outline-2  hover:outline hover:outline-blue-600">
              Create
            </button>
          </form>
        </div>

      </div>
    </>
  )
}

export default createPost