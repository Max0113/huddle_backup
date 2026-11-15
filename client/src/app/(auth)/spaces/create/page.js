"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { CreateSchema } from "@/lib/validations/space";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const inputClassName =
  "h-[52px] rounded-2xl border-border bg-input px-4 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-base";

export default function CreateSpacePage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(CreateSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      map_id: "",
      description: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("Create Space:", data);

      toast.success("Space created.");
    } catch (error) {
      toast.error("Something went wrong.");
    }
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
        <div className="w-full max-w-[424px]">
          <h1 className="text-[1.75rem] font-bold leading-tight tracking-tight text-foreground sm:pt-[13px] sm:text-4xl sm:tracking-[-0.042em]">
            Create Your <span className="whitespace-nowrap">Space 👋</span>
          </h1>

          <p className="mt-6 text-base leading-6 tracking-[-0.011em] text-muted-foreground sm:mt-[23px] sm:text-lg">
            Create a virtual workspace where your team can collaborate,
            communicate, and connect.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mt-7 sm:mt-8"
          >
            <FieldGroup className="gap-3">
              {/* Name */}
              <Field className="gap-[9px]">
                <FieldLabel htmlFor="space-name">Name</FieldLabel>

                <Input
                  id="space-name"
                  placeholder="Réunion1"
                  autoComplete="off"
                  aria-invalid={!!errors.name}
                  {...register("name")}
                  className={inputClassName}
                />

                {errors.name && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </Field>

              {/* Map ID */}
              <Field className="gap-[9px]">
                <FieldLabel htmlFor="space-map">Map ID</FieldLabel>

                <Input
                  id="space-map"
                  type="text"
                  placeholder="Enter map ID"
                  aria-invalid={!!errors.map_id}
                  {...register("map_id")}
                  className={inputClassName}
                />

                {errors.map_id && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.map_id.message}
                  </p>
                )}
              </Field>

              {/* Description */}
              <Field className="gap-[9px]">
                <FieldLabel htmlFor="space-description">Description</FieldLabel>

                <Input
                  id="space-description"
                  placeholder="Group meeting"
                  autoComplete="off"
                  aria-invalid={!!errors.description}
                  {...register("description")}
                  className={inputClassName}
                />

                {errors.description && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.description.message}
                  </p>
                )}
              </Field>
            </FieldGroup>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-11 h-[52px] w-full rounded-2xl bg-primary text-[19px] font-medium text-primary-foreground hover:bg-primary-strong"
            >
              {isSubmitting ? "Creating..." : "Create Space"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
