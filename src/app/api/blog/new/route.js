import { connectToDb } from "@/lib/dbConnect";
import { Post } from "@/lib/models";

export const POST = async (req) => {
  const { title, desc, email, image, userId } = await req.json()
  const slug = title.replace(" ", "-".toLowerCase())
  await connectToDb()
  try {
    const newPost = new Post({
      title,
      desc,
      email,
      userId,
      img: "/post.png",
      slug
    })
    await newPost.save()
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

};
