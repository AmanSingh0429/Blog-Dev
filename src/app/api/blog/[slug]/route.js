import { connectToDb } from "@/lib/dbConnect"
import { Post } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { slug } = params
  try {
    connectToDb();
    const post = await Post.findOne({ slug });
    return NextResponse.json(post);
  } catch (error) {
    console.log(error, "error getting single post");
    throw new Error("error getting single post")
  }
}