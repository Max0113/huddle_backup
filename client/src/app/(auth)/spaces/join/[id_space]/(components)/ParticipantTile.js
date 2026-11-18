"use client";

import { Headphones } from "lucide-react";
import { cn } from "cn";

import Portrait from "./Portrait";

export default function ParticipantTile({ person, selected, onSelect }) {
  return (
    <button
      type="button"
      data-participant
      aria-label={`Select ${person.name}${person.status ? `, ${person.status}` : ""}`}
      aria-pressed={selected}
      onClick={() => onSelect(person.id)}
      className="group absolute z-10 flex -translate-x-1/2 flex-col items-center rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
      style={{
        left: `${person.x}px`,
        top: `${person.y - person.size / 2}px`,
      }}
    >
      <span
        className={cn(
          "relative block rounded-[28%] p-[3px] transition-all duration-200 group-hover:-translate-y-0.5",
          selected &&
            "shadow-[0_0_0_3px_rgba(167,139,250,.7),0_0_34px_rgba(149,100,221,.5)]",
        )}
        style={{ backgroundColor: person.ring }}
      >
        <span className="block rounded-[26%] bg-[#0b0b0d] p-[2px]">
          <span
            className="block overflow-hidden rounded-[24%]"
            style={{ width: person.size, height: person.size }}
          >
            <Portrait variant={person.variant} name={person.name} />
          </span>
        </span>
        {person.headphones ? (
          <span className="absolute -bottom-1 -right-1 grid size-6 place-items-center rounded-full bg-[#7c4dce] text-white ring-2 ring-[#0b0b0d]">
            <Headphones className="size-3" aria-hidden="true" />
            <span className="sr-only">Headphones on</span>
          </span>
        ) : null}
      </span>

      <span
        className={cn(
          "-mt-2.5 max-w-[190px] rounded-full bg-[#0a0a0c]/95 px-2.5 py-1 text-center shadow-[0_6px_18px_rgba(0,0,0,.35)] ring-1 ring-white/10 backdrop-blur-sm",
          person.status ? "px-3 py-1.5" : "",
        )}
      >
        <span className="flex items-center justify-center gap-1.5">
          <span
            className={cn(
              "size-1.5 shrink-0 rounded-full",
              person.status && person.headphones
                ? "bg-[#c4a7f5]"
                : "bg-emerald-400",
            )}
          />
          <span className="truncate text-[12.5px] font-semibold leading-none text-white">
            {person.name}
          </span>
        </span>
        {person.status ? (
          <span className="mt-1 block truncate text-[10px] font-medium leading-none text-zinc-400">
            {person.status}
          </span>
        ) : null}
      </span>
    </button>
  );
}
