"use server"
import { connectToDb } from "@/lib/dbConnect";
import { Post, User } from "@/lib/models";
import { revalidatePath } from "next/cache";

export const addPost = async (form) => {
  const { title, desc, slug, userId, email } = Object.fromEntries(form);
  console.log(title, desc, slug, userId, email)
  try {
    await connectToDb();
    const newPost = new Post({
      title,
      desc,
      slug,
      userId,
      email,
    });
    await newPost.save();
    console.log("Post added");
    revalidatePath("/blog");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong while creating new post" };
  }
};

export const deletePost = async (form) => {
  const { id } = Object.fromEntries(form);
  try {
    await connectToDb();
    await Post.findByIdAndDelete(id);
    console.log("Post deleted");
    revalidatePath("/blog");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong while deleting the post" };
  }
};

export const deleteUser = async (form) => {
  const { id } = Object.fromEntries(form);
  try {
    await connectToDb();
    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    console.log("User and associated posts deleted");
    revalidatePath("/admin")
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong while deleting the user" };
  }
};
