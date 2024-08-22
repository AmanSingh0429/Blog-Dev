"use client"

import { signIn } from "next-auth/react"
import Link from "next/link"
import { FaGithub } from "react-icons/fa"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

const Login = () => {
  const form = useForm()
  const { register, handleSubmit, formState, setError } = form
  const { errors, isSubmitting } = formState
  const router = useRouter()
  const onLogin = async (user) => {
    const { email, password } = user
    try {
      const res = await signIn("credentials", { redirect: false, email, password })
      if (res.error) {
        setError("root", {
          message: res.error
        })
        return;
      } else {
        router.push("/blog")
      }
    } catch (error) {
      console.log(error.message)
      setError("root", {
        message: "An unexpected error occurred. Please try again."
      })
    }
  };


  return (
    <>
      <div className="flex items-center justify-center">
        <div className="h-fit w-[400px] sm:bg-slate-900 p-2 flex flex-col gap-6 rounded-md">
          <h1 className="text-3xl font-bold text-center m-4">LogIn</h1>
          <button
            className="flex gap-1 bg-gray-950 w-full justify-center py-3 border rounded-md "
            onClick={() => signIn("github")}
          >
            LogIn with Github<FaGithub className="mt-1" />
          </button>
          <div >
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onLogin)}
            >

              <label htmlFor="email"> Email
                <input
                  type="text"
                  placeholder="email"
                  className="px-3 py-1 w-full bg-slate-700 rounded-md"
                  id="email"
                  {...register("email", {
                    required: 'Email is required',
                  })}
                />
              </label>

              <label htmlFor="password"> Password
                <input
                  type="password"
                  placeholder="password"
                  className="px-3 py-1 w-full bg-slate-700 rounded-md"
                  {...register("password", {
                    required: 'Password Is required'
                  })}
                />
              </label>
              <button
                disabled={isSubmitting}
                className="bg-white px-4 py-2 rounded-md text-black text font-semibold"
              >
                Continue With Credentials
              </button>

            </form>
          </div>
          {errors.root && <p className="text-sm text-red-500">{errors.root.message}</p>}
          <Link href="/signup" className="underline text-center">Haven't SignedUp? SignUp here </Link>
        </ div>
      </div>
    </>
  )
}

export default Login