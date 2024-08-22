import { connectToDb } from "./dbConnect";
import { Post, User } from "./models";

import { unstable_noStore as noStore } from "next/cache";



//GETTING ALL POSTS
export const getPosts = async () => {
  try {
    connectToDb();
    const posts = await Post.find().lean();
    return posts;
  } catch (error) {
    console.log(error)
    throw new Error(error, "Error fetching posts")
  }
};
// GETTING SINGLE POST
export const getPost = async (slug) => {
  noStore();
  try {
    connectToDb();
    const post = await Post.findOne({ slug });
    return post;
  } catch (error) {
    console.log(error)
    throw new Error(error, "Error fetching post")
  }
};
//GETTING ALL USERS
export const getUsers = async () => {
  try {
    connectToDb();
    const users = await User.find().lean();
    return users;
  } catch (error) {
    console.log(error);
    throw new Error(error, "Error fetching Users")
  }
}
//GETTING SINGLE USER
export const getUser = async (id) => {
  try {
    await connectToDb();
    const user = await User.findById(id);
    return user
  } catch (error) {
    console.log(error)
    throw new Error(error, "Error fetching user")
  }
};