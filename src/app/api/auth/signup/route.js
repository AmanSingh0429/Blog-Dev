import bcrypt from "bcryptjs"
import { connectToDb } from "@/lib/dbConnect";
import { User } from "@/lib/models";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const reqBody = await req.json()
  const { username, password, email, img } = reqBody

  try {
    await connectToDb()
    const userExists = await User.findOne({ email })
    if (userExists) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)

    const newUser = new User({
      username,
      email,
      password: hashedPass,
      img
    })

    await newUser.save()
    return NextResponse.json({ message: "User Saved" }, { status: 200 })
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
