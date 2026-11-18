"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Check,
  ChevronDown,
  ChevronsLeft,
  Link2,
  Pencil,
  UserX,
  X,
} from "lucide-react";
import { cn } from "cn";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";

import { copyInviteLink } from "./clipboard";
import { FLOORS, INVITE_PEOPLE, SIDEBAR_PEOPLE } from "./data";
import Portrait from "./Portrait";

const MENU_CLASS =
  "dark w-56 border border-white/10 bg-[#141417] p-1.5 text-zinc-100 shadow-2xl ring-1 ring-white/5";

function FloorMenu() {
  const [floor, setFloor] = useState(FLOORS[0].value);
  const activeFloor = FLOORS.find((item) => item.value === floor) ?? FLOORS[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            className="mt-1.5 flex items-center gap-1.5 rounded-md px-1 py-0.5 text-[11px] font-medium text-zinc-400 outline-none transition-colors hover:bg-white/5 hover:text-zinc-200 focus-visible:ring-2 focus-visible:ring-[#c4a7f5]"
          />
        }
      >
        <Building2 className="size-3" aria-hidden="true" />
        {activeFloor.label}
        <ChevronDown className="size-3 text-zinc-500" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        side="bottom"
        sideOffset={8}
        className={MENU_CLASS}
      >
        <DropdownMenuRadioGroup value={floor} onValueChange={setFloor}>
          <DropdownMenuLabel className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Floors
          </DropdownMenuLabel>
          {FLOORS.map((item) => (
            <DropdownMenuRadioItem
              key={item.value}
              value={item.value}
              disabled={item.soon}
              className="rounded-lg py-1.5 focus:bg-white/10 focus:text-white"
            >
              {item.label}
              {item.soon ? (
                <span className="ml-auto rounded-full bg-white/5 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide text-zinc-500">
                  Soon
                </span>
              ) : null}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function InviteCard() {
  const [title, setTitle] = useState("Experience Huddle together");
  const [description, setDescription] = useState(
    "Invite your closest collaborators.",
  );
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftDescription, setDraftDescription] = useState(description);
  const [editing, setEditing] = useState(false);

  const beginEditing = () => {
    setDraftTitle(title);
    setDraftDescription(description);
    setEditing(true);
  };

  const cancelEditing = () => {
    setDraftTitle(title);
    setDraftDescription(description);
    setEditing(false);
  };

  const saveInvite = (event) => {
    event.preventDefault();
    const nextTitle = draftTitle.trim();

    if (!nextTitle) {
      return;
    }

    setTitle(nextTitle);
    setDescription(draftDescription.trim());
    setEditing(false);
  };

  return (
    <div className="rounded-2xl bg-[#0b0b0c] p-4 ring-1 ring-white/[0.06]">
      {editing ? (
        <form onSubmit={saveInvite} className="space-y-2">
          <Input
            value={draftTitle}
            onChange={(event) => setDraftTitle(event.target.value)}
            aria-label="Invite card title"
            autoFocus
            maxLength={48}
            className="h-8 rounded-lg border-white/10 bg-white/5 px-2.5 text-[11px] font-medium text-white placeholder:text-zinc-600 focus-visible:border-[#a78bfa] focus-visible:ring-[#9564dd]/30"
          />
          <Input
            value={draftDescription}
            onChange={(event) => setDraftDescription(event.target.value)}
            aria-label="Invite card description"
            maxLength={80}
            className="h-8 rounded-lg border-white/10 bg-white/5 px-2.5 text-[10px] text-zinc-300 placeholder:text-zinc-600 focus-visible:border-[#a78bfa] focus-visible:ring-[#9564dd]/30"
          />
        </form>
      ) : (
        <>
          <h2 className="text-[12.5px] font-semibold leading-tight text-zinc-100">
            {title}
          </h2>
          <p className="mt-1 text-[10.5px] leading-snug text-zinc-500">
            {description}
          </p>
        </>
      )}

      <div className="mt-3 flex items-center gap-1.5" aria-hidden="true">
        {INVITE_PEOPLE.map((person) => (
          <span
            key={person.variant}
            className="rounded-full p-[2px]"
            style={{ backgroundColor: person.ring }}
          >
            <span className="block size-7 overflow-hidden rounded-full border-2 border-[#0b0b0c]">
              <Portrait variant={person.variant} name="" />
            </span>
          </span>
        ))}
      </div>

      {editing ? (
        <div className="mt-3 flex items-stretch gap-1 rounded-[10px] bg-[#9564dd] p-[3px]">
          <Button
            type="button"
            onClick={saveInvite}
            className="h-7 flex-1 gap-1.5 rounded-lg bg-transparent text-[11px] font-semibold text-white shadow-none hover:bg-white/15 focus-visible:ring-white/70"
          >
            <Check className="size-3.5" aria-hidden="true" />
            Save
          </Button>
          <Separator
            orientation="vertical"
            className="my-1 w-px bg-white/25"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={cancelEditing}
            aria-label="Cancel invite card changes"
            className="size-7 rounded-lg text-white hover:bg-white/15 focus-visible:ring-white/70"
          >
            <X className="size-3.5" aria-hidden="true" />
          </Button>
        </div>
      ) : (
        <div className="mt-3 flex items-stretch gap-1 rounded-[10px] bg-[#9564dd] p-[3px]">
          <Button
            type="button"
            onClick={copyInviteLink}
            className="h-7 flex-1 gap-1.5 rounded-lg bg-transparent text-[11.5px] font-semibold text-white shadow-none hover:bg-white/15 focus-visible:ring-white/70"
          >
            <Link2 className="size-3.5" aria-hidden="true" />
            Invite
          </Button>
          <Separator
            orientation="vertical"
            className="my-1 w-px bg-white/25"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={beginEditing}
            aria-label="Edit the invitation message"
            title="Edit invite message"
            className="size-7 rounded-lg text-white hover:bg-white/15 focus-visible:ring-white/70"
          >
            <Pencil className="size-3.5" aria-hidden="true" />
          </Button>
        </div>
      )}
    </div>
  );
}

function PersonRow({ person, online }) {
  return (
    <div className="group flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/[0.035]">
      <Avatar className="size-8">
        <AvatarFallback
          className={cn(
            "text-[11px] font-semibold",
            online ? "text-[#1e1335]" : "text-[#40331a]",
          )}
          style={{ backgroundColor: person.color }}
        >
          {person.initial}
        </AvatarFallback>
        {online ? (
          <span className="absolute -bottom-0.5 -right-0.5 z-10 size-2.5 rounded-full bg-emerald-400 ring-2 ring-[#171717]" />
        ) : null}
      </Avatar>
      <div className="min-w-0">
        <p
          className={cn(
            "truncate text-[11.5px] font-medium leading-tight",
            online ? "text-zinc-200" : "text-zinc-500",
          )}
        >
          {person.name}
        </p>
        {person.status ? (
          <p className="mt-0.5 text-[10px] leading-tight text-zinc-500">
            {person.status}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function PeopleGroup({ label, people, online, open, onToggle }) {
  return (
    <section className="first:mt-1">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-1.5 rounded-md px-2 pb-1.5 pt-2 text-[9.5px] font-semibold uppercase tracking-[0.09em] text-zinc-500 outline-none transition-colors hover:text-zinc-300 focus-visible:ring-2 focus-visible:ring-[#c4a7f5]"
      >
        {label} ({people.length})
        <ChevronDown
          className={cn(
            "size-3 transition-transform duration-200",
            !open && "-rotate-90",
          )}
          aria-hidden="true"
        />
      </button>
      {open ? (
        <div className="space-y-0.5">
          {people.map((person) => (
            <PersonRow key={person.id} person={person} online={online} />
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default function WorkspaceSidebar({
  displayName = "Youmes",
  onCollapse,
  isDrawer = false,
}) {
  const [query, setQuery] = useState("");
  const [onlineOpen, setOnlineOpen] = useState(true);
  const [offlineOpen, setOfflineOpen] = useState(true);

  const normalizedQuery = query.trim().toLowerCase();
  const matches = (person) =>
    !normalizedQuery ||
    person.name.toLowerCase().includes(normalizedQuery) ||
    (person.status ?? "").toLowerCase().includes(normalizedQuery);

  const onlinePeople = SIDEBAR_PEOPLE.online.filter(matches);
  const offlinePeople = SIDEBAR_PEOPLE.offline.filter(matches);
  const hasResults = onlinePeople.length + offlinePeople.length > 0;

  return (
    <aside
      aria-label="Space sidebar"
      className="flex h-full min-h-0 w-full flex-col bg-[#171717]"
    >
      <div className="flex items-start justify-between gap-3 px-5 pb-2 pt-5">
        <div className="min-w-0">
          <h1 className="truncate text-[17px] font-semibold tracking-[-0.01em] text-zinc-50">
            {displayName}
          </h1>
          <FloorMenu />
        </div>
        {onCollapse ? (
          <button
            type="button"
            onClick={onCollapse}
            aria-label={isDrawer ? "Close space menu" : "Collapse sidebar"}
            title={isDrawer ? "Close menu" : "Collapse sidebar"}
            className="-mr-1 -mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg text-zinc-500 outline-none transition-colors hover:bg-white/5 hover:text-zinc-200 focus-visible:ring-2 focus-visible:ring-[#c4a7f5]"
          >
            {isDrawer ? (
              <X className="size-4" aria-hidden="true" />
            ) : (
              <ChevronsLeft className="size-4" aria-hidden="true" />
            )}
          </button>
        ) : null}
      </div>

      <div className="px-4 pt-3">
        <InviteCard />
      </div>

      <form
        role="search"
        onSubmit={(event) => event.preventDefault()}
        className="px-4 pt-3"
      >
        <InputGroup className="h-9 gap-0 rounded-full border-white/[0.06] bg-[#0b0b0c] has-[[data-slot=input-group-control]:focus-visible]:border-white/20 has-[[data-slot=input-group-control]:focus-visible]:ring-white/10">
          <InputGroupInput
            data-people-search
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search people"
            aria-label="Search people"
            autoComplete="off"
            className="h-9 px-3.5 text-[11px] text-zinc-200 placeholder:text-zinc-500"
          />
          <InputGroupAddon
            align="inline-end"
            className="gap-1 px-2 py-0"
            aria-hidden="true"
          >
            <kbd className="rounded bg-white/[0.07] px-1 py-0.5 font-sans text-[9px] font-medium leading-none text-zinc-500 ring-1 ring-white/[0.04]">
              Ctrl
            </kbd>
            <kbd className="rounded bg-white/[0.07] px-1 py-0.5 font-sans text-[9px] font-medium leading-none text-zinc-500 ring-1 ring-white/[0.04]">
              F
            </kbd>
          </InputGroupAddon>
        </InputGroup>
      </form>

      <div className="min-h-0 flex-1 overflow-y-auto px-3.5 pb-6">
        {hasResults ? (
          <>
            {onlinePeople.length > 0 ? (
              <PeopleGroup
                label="Online"
                people={onlinePeople}
                online
                open={onlineOpen}
                onToggle={() => setOnlineOpen((open) => !open)}
              />
            ) : null}
            {offlinePeople.length > 0 ? (
              <PeopleGroup
                label="Offline"
                people={offlinePeople}
                online={false}
                open={offlineOpen}
                onToggle={() => setOfflineOpen((open) => !open)}
              />
            ) : null}
          </>
        ) : (
          <div className="mt-10 flex flex-col items-center gap-2 px-4 text-center">
            <UserX className="size-6 text-zinc-600" aria-hidden="true" />
            <p className="text-[11px] font-medium text-zinc-400">
              No one here by that name
            </p>
            <p className="text-[10px] leading-relaxed text-zinc-600">
              Try a different search or invite someone new.
            </p>
          </div>
        )}
      </div>

      {isDrawer ? (
        <div className="border-t border-white/[0.06] p-4">
          <Link
            href="/dashbord"
            className="flex items-center gap-2 rounded-lg text-[11px] font-medium text-zinc-400 outline-none transition-colors hover:text-zinc-100 focus-visible:ring-2 focus-visible:ring-[#c4a7f5]"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Back to dashboard
          </Link>
        </div>
      ) : null}
    </aside>
  );
}
