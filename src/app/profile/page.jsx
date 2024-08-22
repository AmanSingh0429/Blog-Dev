"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { getUser } from "@/lib/data";

const Profile = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(session.userId);
        setUser(userData);
        console.log(user)
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (session?.userId) {
      fetchUser();
    }
  }, [session?.userId]);

  return (
    <>
      <div className="flex justify-between w-[800px]">
        <Image
          src={session?.img ? session.img : "/noavatar.png"}
          width={120}
          height={120}
          alt="Profile Picture"
        />
        <div>
          <p className="text-4xl font-bold text-slate-500">Username:</p>
          <p className="p-2">
            {user?.img || session?.name}
          </p>
        </div>
        <div>
          <p className="text-4xl font-bold text-slate-500">Email:</p>
          <p className="p-2">
            {user?.email || session?.email}
          </p>
        </div>
      </div>
    </>
  );
};

export default Profile;
