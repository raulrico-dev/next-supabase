"use client";
import { useEffect, useState } from "react";
import { getProfile } from "@/utils/supabase/get-user-profile";
import SignOutButton from "../common/signout-button";

export default function ProfileForm({ user }) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    username: "",
    bio: "",
    avatar: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProfile(user);
      setProfile({
        username: res.username,
        bio: res.bio,
        avatar: res.avatar_url,
      });
      setLoading(false);
    };

    fetchData();
  }, [user]);

  return (
    <>
      <section className="w-full max-w-screen-md m-auto">
        <div className="flex flex-row gap-4 w-full px-6 py-4 md:py-6 2xl-px-8 2xl:py-8 border border-neutral-800 rounded-2xl">
          <div className="w-40 h-40">
            <img
              src={profile.avatar}
              alt={profile.username}
              width={96}
              height={96}
              className="select-none w-full object-cover rounded-full"
            />
          </div>
          <div className="flex-1 flex flex-col p-4">
            <div className="">
              <h2 className="uppercase text-2xl font-medium">
                {profile.username}
              </h2>
            </div>
            <div className="">
              <p className="text-sm font-normal">{profile.bio}</p>
            </div>
          </div>
          <div className="flex flex-col justify-start items-center">
            <SignOutButton className="hover:bg-neutral-900 px-2 py-2 rounded-full">
              <svg
                width="20"
                height="20"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 8.5v-8M2.618 2.499A6.96 6.96 0 0 0 .5 7.495c0 3.864 3.135 7.005 7 7.005 3.867 0 7-3.141 7-7.005A6.97 6.97 0 0 0 12.395 2.5"
                  stroke="currentColor"
                  stroke-linecap="square"
                />
              </svg>
            </SignOutButton>
          </div>
        </div>
      </section>
    </>
  );
}
