"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
const createUser = () => {
  const router = useRouter()
  const { register, setError, formState: { errors, isSubmitting }, handleSubmit } = useForm()
  const handleCreate = async (user) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: 'POST',
        body: JSON.stringify(user)
      })
      if (res.ok) {
        router.push("/admin")
      } else {
        const error = await res.json();
        setError("root", {
          message: error.error
        })
      }
    } catch (error) {
      setError("root", {
        message: error.message
      })
    }

  }
  return (
    <>
      <div className="h-full w-full flex justify-center items-center">
        <div className="h-fit w-[400px] sm:bg-slate-900 p-2 flex flex-col gap-6 rounded-md">

          <h1 className="text-3xl font-bold text-center m-4">Create New User </h1>
          <form className=" flex flex-col gap-5" onSubmit={handleSubmit(handleCreate)}>
            <div>
              <label>
                Email
                <input
                  type="text"
                  placeholder="Email"
                  id="email"
                  className="px-3 py-1 w-full bg-slate-700 rounded-md text-lg"
                  {
                  ...register("email", {
                    required: 'Email Is Required',
                    pattern: {
                      value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: 'Invalid Email Format'
                    }
                  })
                  }
                />
              </label>
              <p className="text-red-600 text-sm" >{errors.email?.message}</p >
            </div>
            <div>
              <label>
                Username
                <input
                  type="text"
                  placeholder="Username"
                  id="useranme"
                  className="px-3 py-1 w-full bg-slate-700 rounded-md text-lg"
                  {
                  ...register("username", {
                    required: 'Username Is Required',
                  })
                  }
                />
              </label>
              <p className="text-red-600 text-sm">{errors.username?.message}</p>
            </div>

            <div>
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  className="px-3 py-1 w-full bg-slate-700 rounded-md text-lg"
                  id="password"
                  {...register("password", {
                    required: 'Password is required',
                  })}
                />
              </label>
              <p className="text-red-600 text-sm" >{errors.password?.message}</p>
            </div>

            {errors.root && <p className="text-red-500 text-sm text-center">{errors.root.message}</p>}
            <button
              disabled={isSubmitting}
              className="bg-white px-4 py-2 rounded-md text-black text font-semibold"
            >
              Create
            </button>
          </form>

        </div>
      </div>

    </>
  )
}

export default createUser