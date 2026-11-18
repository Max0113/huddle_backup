"use client";

import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

// Validation schema
const invitationSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, "Invitation code is required.")
    .max(64, "Invitation code is too long.")
    .regex(/^[A-Za-z0-9-]+$/, "Invalid invitation code format."),
});

export default function JoinSpacePage() {
  const form = useForm({
    resolver: zodResolver(invitationSchema),
    defaultValues: {
      code: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const handleJoin = async (values) => {
    try {
      const invitationCode = values.code.trim().toUpperCase();
      console.log("Invitation code:", invitationCode);
      toast.info("Ready to verify your invitation code.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="dark relative flex min-h-svh flex-col bg-background text-foreground [color-scheme:dark]">
      {/* Header */}
      <header className="absolute inset-x-0 top-12 z-10 flex justify-center px-5 sm:top-[75px]">
        <Link
          href="/"
          aria-label="Huddle home"
          className="rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <Image
            src="/logo/Comleted_logo.png"
            alt="Huddle"
            width={109}
            height={37}
            priority
            className="h-[37px] w-auto"
          />
        </Link>
      </header>

      {/* Main */}
      <main className="flex flex-1 items-center justify-center px-5 py-32 sm:px-6 sm:py-36">
        <section className="w-full max-w-[464px] sm:translate-x-[14px] sm:translate-y-[10px]">
          <div className="mb-8">
            <h1 className="text-[28px] font-bold tracking-tight text-white">
              Join a Workspace
            </h1>

            <p className="mt-2 text-base leading-6 text-[#939393]">
              Enter the invitation code shared with you to join a workspace.
            </p>
          </div>

          {/* Invitation Form */}
          <form onSubmit={form.handleSubmit(handleJoin)} className="space-y-6">
            <Controller
              control={form.control}
              name="code"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="invitation-code">
                    Invitation Code
                  </FieldLabel>

                  <Input
                    {...field}
                    id="invitation-code"
                    placeholder="e.g. DEV-82KLM"
                    autoComplete="off"
                    disabled={isLoading}
                    aria-invalid={fieldState.invalid}
                    className="h-[52px] rounded-xl border-border bg-card px-4 text-base uppercase tracking-wider text-white placeholder:text-muted-foreground"
                  />

                  <FieldDescription>
                    Enter the code provided by your workspace owner.
                  </FieldDescription>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="h-[52px] w-full rounded-2xl text-base font-semibold"
            >
              {isLoading ? "Verifying..." : "Join Workspace"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[#939393]">
            Don't have an invitation code? Ask your workspace owner to share
            one.
          </p>

          <div className="mt-8 text-center">
            <Link
              href="/dashbord"
              className="text-sm text-muted-foreground transition-colors hover:text-white"
            >
              Back to home
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
