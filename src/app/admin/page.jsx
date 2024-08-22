import { deletePost, deleteUser } from "@/lib/actions";
import { getPosts, getUsers } from "@/lib/data";
import Link from "next/link";

const AdminPage = async () => {
  const users = await getUsers();
  const posts = await getPosts();

  return (
    <div className="h-full w-full">
      <div className="w-full flex flex-col gap-4 p-4">
        <h2 className="text-white">Users</h2>
        {users.map((user) => (
          <div
            key={user._id}
            className="flex justify-between items-center gap-3 bg-gray-800 p-2 rounded-md"
          >
            <span>{user.username}</span>
            <form action={deleteUser}>
              <input type="hidden" value={user._id} name="id" />
              <button className="bg-red-600 text-white px-3 py-1 rounded-md">
                Delete
              </button>
            </form>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Link href={"/create-user"} className="bg-white text-black rounded-md p-3 font-bold hover:bg-transparent hover:border hover:text-white">
          Add user
        </Link>
      </div>

      <div className="w-full flex flex-col gap-4 p-4 mt-4">
        <h2 className="text-white">Posts</h2>
        {posts.map((post) => (
          <div
            key={post._id}
            className="flex justify-between items-center gap-3 bg-gray-800 p-2 rounded-md"
          >
            <span>{post.title}</span>
            <form action={deletePost}>
              <input type="hidden" value={post._id} name="id" />
              <button className="bg-red-600 text-white px-3 py-1 rounded-md">
                Delete
              </button>
            </form>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Link href={"/create-post"} className="bg-white text-black rounded-md p-3 font-bold hover:bg-transparent hover:border hover:text-white">
          Add post
        </Link>
      </div>
    </div>

  );
};

export default AdminPage;
