import { Quote } from "lucide-react";
import Image from "next/image";
import PageBackground from "@/components/PageBackground";
import SignInButton from "@/components/SignInButton";
import { ranks } from "@/utils/ranks";

export default function About() {
  return (
    <PageBackground image="/about.png" alt="About background">
      <div className="mx-auto mt-12 mb-12 w-full max-w-4xl px-4 sm:mt-16 sm:mb-12 sm:px-6 md:mt-28 md:mb-28">
        <h1 className="text-4xl font-bold text-gray-200 md:text-5xl">About</h1>
        <div className="mt-6 mb-8 sm:mt-4 sm:mb-6 md:mt-8 md:mb-10">
          <p className="text-base text-gray-200 sm:text-lg md:text-xl">
            Layoffield is a platform that allows you to track the battles in the
            layoff war.
          </p>
          <p className="mt-4 text-base text-gray-200 sm:text-lg md:text-xl">
            You can register the <span className="line-through">layoffs</span>{" "}
            battles you have been through and check your ranking compared to
            other soldiers around the world.
          </p>
          <p className="mt-4 text-base text-gray-200 sm:text-lg md:text-xl">
            Mainly intended for devs, but not exclusively limited to them.
            However, you need a GitHub account to join in the army.
          </p>
          <p className="mt-4 text-base text-gray-200 sm:text-lg md:text-xl">
            Ready to beat the enemy?
          </p>
        </div>
        <SignInButton />
      </div>
      <div className="-mx-4 bg-black/80 px-8 py-16 sm:-mx-8 sm:px-14 sm:py-24 md:px-16 lg:px-32 xl:px-64">
        <div className="relative border-r-2 border-b-2 border-l-2 border-gray-200/80 p-16 md:p-12">
          <div className="absolute top-0 left-0 w-5 border-t-2 border-gray-200/80" />
          <div className="absolute top-0 right-0 left-[122px] border-t-2 border-gray-200/80" />
          <h4 className="mb-4 text-lg font-semibold text-gray-200">
            The greatness of our Army has always been the ability of our
            Soldiers who serve in the ranks to rise to the challenge against the
            odds, in the face of danger, and win.
          </h4>
          <p className="text-sm text-gray-400">
            Julius W. Gates, Eighth Sergeant Major of the Army
          </p>
          <Quote className="absolute -top-10 left-[30px] z-0 h-[60px] w-[82px] text-gray-200" />
        </div>
      </div>
      <div className="mx-auto mt-12 mb-12 w-full max-w-4xl px-4 sm:mt-16 sm:mb-12 sm:px-6 md:mt-28 md:mb-28">
        <p className="mt-4 text-base text-gray-200 sm:text-lg md:text-xl">
          Each battle fought provides some experience, each win increases the
          prestige, which is used to determine your soldier&apos;s rank.
        </p>
        <p className="mt-4 text-base text-gray-200 sm:text-lg md:text-xl">
          More battles, more experience. This means that high-ranking soldiers
          can anticipate battle arising months in advance by just sensing the
          mood on the <span className="line-through">company</span> battlefield.
        </p>
        <p className="mt-4 text-base text-gray-200 sm:text-lg md:text-xl">
          They the exact moment to abandon the ship.
        </p>
        <p className="mt-4 text-base text-gray-200 sm:text-lg md:text-xl">
          In other hand, last stand soldiers can earn medals for unique and
          brave war deeds. Loyalty should means something.
        </p>
        <p className="mt-4 text-base text-gray-200 sm:text-lg md:text-xl">
          Can you become a decorated soldier?
        </p>
      </div>
      <div className="-mx-4 bg-black/80 px-8 py-16 sm:-mx-8 sm:px-14 sm:py-24 md:px-16 lg:px-32 xl:px-64">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-200 md:text-5xl">
          Ranks
        </h1>
        <div className="grid grid-cols-2 gap-16 p-8 sm:grid-cols-3 md:grid-cols-4">
          {ranks.map(({ name, image }) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <Image
                src={image}
                alt={`${name} rank`}
                quality={100}
                width={150}
                height={150}
              />
              <span className="text-center text-sm font-medium text-gray-200">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </PageBackground>
  );
}
