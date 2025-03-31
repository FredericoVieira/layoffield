import { Github } from "lucide-react";
import { signIn } from "@/actions/server";

export default function SignInButton() {
  return (
    <button
      onClick={signIn}
      className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-orange-500 px-8 py-3 font-semibold text-white transition-colors duration-200 hover:bg-orange-600 sm:text-lg md:text-xl"
    >
      <Github />
      Sign in
    </button>
  );
}
