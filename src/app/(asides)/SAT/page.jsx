
import { addPost, deletePost } from "@/lib/actions"

const serverAction = () => {

  return (
    <div className="text-black">
      <form action={addPost}>
        <input type="text" placeholder="Title" name="title" />
        <input type="text" placeholder="desc" name="desc" />
        <input type="text" placeholder="slug" name="slug" />
        <input type="text" placeholder="user id" name="userId" />
        <input type="text" placeholder="email" name="email" />
        <button className="bg-white">
          click!
        </button>
      </form>
      <form action={deletePost}>
        <input type="text" placeholder="id" name="id" />
        <button className="bg-white">
          Delete
        </button>
      </form>
    </div>
  )
}

export default serverAction