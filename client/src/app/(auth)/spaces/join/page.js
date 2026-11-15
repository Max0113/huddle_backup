"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function JoinSpacePage() {
  const handleJoin = () => {
    toast.success("Joined General Room.");
  };

  return (
    <div className="dark relative flex min-h-svh flex-col bg-background text-foreground [color-scheme:dark]">
      <header className="absolute inset-x-0 top-12 z-10 flex justify-center px-5 sm:top-[75px]">
        <Link
          href="/"
          aria-label="Huddle home"
          className="rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <Image
            src="/logo/Comleted_logo.png"
            alt=""
            width={109}
            height={37}
            priority
            className="h-[37px] w-auto"
          />
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-5 py-32 sm:px-6 sm:py-36">
        <section
          aria-labelledby="room-name"
          className="w-full max-w-[464px] sm:translate-x-[14px] sm:translate-y-[10px]"
        >
          <div className="flex items-center gap-4 sm:-ml-1">
            <Avatar
              aria-hidden="true"
              className="size-[60px] shrink-0 after:hidden sm:relative sm:top-[-4px]"
            >
              <AvatarFallback className="bg-[#F0ABFC] text-2xl font-semibold text-[#581C87]">
                A
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <h1
                id="room-name"
                className="text-[26px] font-bold leading-8 tracking-[-0.01em] text-white"
              >
                General Room
              </h1>
              <p
                id="room-description"
                className="mt-1.5 text-base leading-6 text-[#939393]"
              >
                A place for everyone to chat, share updates, and stay connected.
              </p>
            </div>
          </div>

          <Button
            type="button"
            onClick={handleJoin}
            aria-describedby="room-description"
            className="mt-7 h-[52px] w-full rounded-2xl bg-primary text-[19px] font-medium text-primary-foreground hover:bg-primary-strong"
          >
            Join Room
          </Button>
        </section>
      </main>
    </div>
  );
}
