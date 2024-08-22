import { connectToDb } from "@/lib/dbConnect"
import { Post } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    connectToDb();
    const posts = await Post.find();
    return NextResponse.json(posts);
  } catch (error) {
    console.log("Failed to fetch post");
    throw new Error("Failed to fetch post")
  }
}