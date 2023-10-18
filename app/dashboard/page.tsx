"use client";

import React, { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { signOut, getAuth } from "firebase/auth";

function page() {
  const user = UserAuth();
  const router = useRouter();
  const auth = getAuth();

  console.log("user:", user);

  useEffect(() => {
    // this checks if the user is logged in and if not, redirects them to the home page
    const checkAuth = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          console.log("This is the logged in user", user);
        } else {
          console.log("no user found");
          router.push("/");
        }
      });
    };

    checkAuth();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth)
      .then(() => {
        console.log("sign out successful");
        router.push("/");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen space-y-4'>
        <p>
          This is the dashboard page. You can only see this if you are logged
          in. You are currenty logged in as {user?.user?.email}
        </p>

        <button
          onClick={handleSignOut}
          className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default page;
