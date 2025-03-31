"use server";

import { redirect } from "next/navigation";
import { signInWithOAuth, signOutWithOAuth } from "@/db/server";

export async function signIn() {
  const url = await signInWithOAuth();
  if (url) {
    redirect(url);
  }
}

export async function signOut() {
  await signOutWithOAuth();
  redirect("/");
}
