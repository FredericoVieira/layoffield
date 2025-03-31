import { createServerClient } from "@supabase/ssr";
import { User } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export async function createClient() {
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

export async function signInWithOAuth() {
  const supabase = await createClient();
  const { data } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${baseUrl}/auth/callback`,
    },
  });

  return data?.url;
}

export async function signOutWithOAuth() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}

export async function upsertUser(user: User) {
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

export async function getUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return data?.user;
}

// const page = 2
// const limit = 10
// const offset = (page - 1) * limit

// const { data, error } = await supabase.rpc('get_leaderboard', { limit, offset })
