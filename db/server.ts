"use server";

import { createServerClient } from "@supabase/ssr";
import { User } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const publicVercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {}
      },
    },
  });
}

const getURL = () => {
  let url = siteUrl ?? publicVercelUrl ?? "http://localhost:3000/";
  url = url.startsWith("http") ? url : `https://${url}`;
  url = url.endsWith("/") ? url : `${url}/`;

  return url;
};

async function signInWithOAuth() {
  const supabase = await createClient();
  const url = getURL();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${url}/auth/callback`,
    },
  });

  if (error) {
    throw error;
  }

  return data?.url;
}

export async function signIn() {
  const url = await signInWithOAuth();
  if (url) {
    redirect(url);
  }
}

async function signOutWithOAuth() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}

export async function signOut() {
  await signOutWithOAuth();
}

async function upsertUser(user: User) {
  const {
    id,
    email,
    phone,
    created_at,
    updated_at,
    last_sign_in_at,
    user_metadata,
  } = user;
  const { avatar_url, full_name, user_name } = user_metadata;

  const supabase = await createClient();
  await supabase.from("soldiers").upsert({
    id,
    avatar_url,
    full_name,
    email,
    username: user_name,
    phone,
    created_at,
    updated_at,
    last_sign_in_at,
  });
}

export async function exchangeCodeForSession(code: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (data?.user) {
    await upsertUser(data.user);
  }

  return error;
}
