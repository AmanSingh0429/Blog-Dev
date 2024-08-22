"use client"


import Link from "next/link"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";



const Signup = () => {

  const router = useRouter()

  const form = useForm()
  const { register, handleSubmit, formState, setError } = form
  const { errors, isSubmitting } = formState
  const handleSignUp = async (user) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: 'POST',
        body: JSON.stringify(user)
      })
      if (res.ok) {
        router.push("/login")
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

  };

  return (
    <>
      <div className="h-full w-full flex justify-center items-center">

        <div className="h-fit w-[450px] sm:bg-slate-900 p-4 flex flex-col gap-6 rounded-md" >

          <h1 className="text-3xl font-bold text-center m-4">SignUp</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleSignUp)}>

            <div>
              <label htmlFor="username">
                Username
                <input
                  type="text"
                  placeholder="username"
                  className="px-3 py-1 w-full bg-slate-700 rounded-md text-lg"
                  id="username"
                  {
                  ...register("username", {
                    required: 'Username is required'

                  })
                  }
                />
              </label>
              <p className="text-red-600 text-sm">{errors.username?.message}</p>
            </div>

            <div>
              <label htmlFor="username">
                Email
                <input
                  type="text"
                  placeholder="email"
                  className="px-3 py-1 w-full bg-slate-700 rounded-md text-lg"
                  id="email"
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

            <div>
              <label htmlFor="passwordRepeat">
                Repeat your Password
                <input
                  type="password"
                  className="px-3 py-1 w-full bg-slate-700 rounded-md text-lg"
                  id="passwordRepeat"
                  {
                  ...register("passwordRepeat", {
                    required: 'Please Repeat Your Password',
                    validate: (value) => {
                      value === password || "Passwords do not match"
                    }
                  })
                  }
                />
              </label>
              <p className="text-red-600 text-sm">{errors.passwordRepeat?.message}</p>
            </div>

            <button
              disabled={isSubmitting}
              className="bg-white px-4 py-2 rounded-md text-black text font-semibold">
              Continue
            </button>
            {errors.root && <p className="text-red-500 text-sm text-center">{errors.root.message}</p>}
          </form>

          <Link href="/login" className="underline text-center">SignedUp? Login here </Link>

        </div>

      </div>
    </>
  )
}

export default Signup