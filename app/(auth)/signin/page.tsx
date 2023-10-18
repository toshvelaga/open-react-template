"use client";

import React, { useState, useEffect } from "react";
import {
  signInWithRedirect,
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const router = useRouter();

  const signInWithEmailAndPasswordHandler = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        router.push("/dashboard");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage);
      });
  };

  useEffect(() => {
    const redirectResult = async () => {
      try {
        const result = await getRedirectResult(auth)
          .then(async (result) => {
            console.log("result:", result);

            if (result) {
              // @ts-ignore
              // we want to know if the user is new or not
              // if the user is new, then isNewUser will be true
              // you can use this to trigger a welcome email
              const isNewUser = result?._tokenResponse?.isNewUser;

              if (isNewUser) {
                console.log("new user");
              } else {
                console.log("user already exists");
              }

              router.push("/dashboard");
            }
          })
          .catch((error) => {
            console.log("error:", error);
            // Handle Errors here.
          });
      } catch (error) {
        console.log(error); // Debug errors from redirect response
      }
    };

    redirectResult();
  }, []);

  const handleRegister = async () => {
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='relative'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <div className='pt-32 pb-12 md:pt-40 md:pb-20'>
          {/* Page header */}
          <div className='max-w-3xl mx-auto text-center pb-12 md:pb-20'>
            <h1 className='h1'>
              Welcome back. We exist to make entrepreneurship easier.
            </h1>
          </div>

          <div className='max-w-sm mx-auto'>
            <div className='flex flex-wrap -mx-3'>
              <div className='w-full px-3'>
                <button
                  onClick={handleRegister}
                  className='btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center'
                >
                  <svg
                    className='w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4'
                    viewBox='0 0 16 16'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z' />
                  </svg>
                  <span
                    className='h-6 flex items-center border-r border-white border-opacity-25 mr-4'
                    aria-hidden='true'
                  ></span>
                  <span className='flex-auto pl-16 pr-8 -ml-16'>
                    Sign in with Google
                  </span>
                </button>
              </div>
            </div>

            <div className='flex items-center my-6'>
              <div
                className='border-t border-gray-700 border-dotted grow mr-3'
                aria-hidden='true'
              ></div>
              <div className='text-gray-400'>Or, sign in with your email</div>
              <div
                className='border-t border-gray-700 border-dotted grow ml-3'
                aria-hidden='true'
              ></div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-4'>
              <div className='w-full px-3'>
                <label
                  className='block text-gray-300 text-sm font-medium mb-1'
                  htmlFor='email'
                >
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  id='email'
                  type='email'
                  className='form-input w-full text-gray-300'
                  placeholder='you@yourcompany.com'
                  required
                />
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-4'>
              <div className='w-full px-3'>
                <label
                  className='block text-gray-300 text-sm font-medium mb-1'
                  htmlFor='password'
                >
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  id='password'
                  type='password'
                  className='form-input w-full text-gray-300'
                  placeholder='Password (at least 10 characters)'
                  required
                />
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-4'>
              <div className='w-full px-3'>
                <div className='flex justify-between'>
                  <label className='flex items-center'>
                    <input type='checkbox' className='form-checkbox' />
                    <span className='text-gray-400 ml-2'>
                      Keep me signed in
                    </span>
                  </label>
                  <Link
                    href='/reset-password'
                    className='text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out'
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mt-6'>
              <div className='w-full px-3'>
                <button
                  onClick={signInWithEmailAndPasswordHandler}
                  className='btn text-white bg-purple-600 hover:bg-purple-700 w-full'
                >
                  Sign in
                </button>
              </div>
            </div>
            <div className='text-gray-400 text-center mt-6'>
              Don’t you have an account?{" "}
              <Link
                href='/signup'
                className='text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out'
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
