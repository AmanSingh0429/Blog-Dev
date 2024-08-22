"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import { useForm } from "react-hook-form"

const ContactPage = () => {
  const form = useForm()
  const { register, handleSubmit, formState } = form
  const { errors, isSubmitting } = formState
  const contactSubmit = async (details) => {
    console.log(details)
  };

  return (
    <div className="flex items-center gap-5">
      <div className="relative h-[450px] w-[400px] flex-1 max-lg:hidden">
        <Image src="/contact.png" fill alt="" />
      </div>


      <div className="flex-1 flex items-center flex-col p-4">

        <form className="w-full gap-5 flex flex-col" onSubmit={handleSubmit(contactSubmit)}>

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 text-sm rounded-md bg-[#212036]"
            {...register("fullName", {
              required: 'Please enter your full name'
            })}
          />
          {<p className="text-red-600 text-sm">{errors.fullName?.message}</p>}

          <input
            type="text"
            placeholder="Email Address"
            className="w-full p-3 text-sm rounded-md bg-[#212036]"
            {...register("email", {
              required: 'Please enter your email',
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Invalid Email Format'
              }
            })}
          />
          {<p className="text-red-600 text-sm" >{errors.email?.message}</p >}

          <input
            type="text"
            placeholder="Number"
            className="w-full p-3 text-sm rounded-md bg-[#212036]"
            {...register("number", {
              required: 'Please enter your contct number'
            })}
          />
          {<p className="text-red-600 text-sm">{errors.number?.message}</p>}

          <textarea
            cols="30"
            rows="10"
            placeholder="Message"
            className="w-full p-3 text-sm rounded-md bg-[#212036]"
            {...register("contactBody", {
              required: 'Please fill in the contact body',
              min: 10
            })}
          />
          {<p className="text-red-600 text-sm">{errors.contactBody?.message}</p>}

          <button
            disabled={isSubmitting}
            className="bg-blue-600 w-full rounded-lg  p-2 font-semibold text-lg hover:bg-blue-700 hover:outline-2  hover:outline hover:outline-blue-600">
            Send
          </button>
        </form>

      </div>


    </div>
  )
}

export default ContactPage