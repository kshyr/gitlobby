"use client";
import { signIn, signOut } from "next-auth/react";

export function SignOut() {
  return (
    <button
      className="m-2 ml-auto w-20 rounded-md border border-white"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
}

export function SignIn() {
  return (
    <button
      className="m-2 ml-auto w-20 rounded-md border border-white"
      onClick={() => signIn("github")}
    >
      Sign In
    </button>
  );
}
