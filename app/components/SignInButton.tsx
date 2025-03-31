import { toast } from "react-hot-toast";
import { Github } from "lucide-react";
import { signIn } from "@/db/server";

export default function SignInButton() {
  const handleSignIn = async () => {
    try {
      await signIn();
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign in");
    }
  };

  return (
    <button
      onClick={handleSignIn}
      className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-orange-500 px-8 py-3 font-semibold text-white transition-colors duration-200 hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70 sm:text-lg md:text-xl"
    >
      <>
        <Github />
        <span>Sign in</span>
      </>
    </button>
  );
}
