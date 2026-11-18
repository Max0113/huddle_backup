"use client";

import { useCallback, useEffect, useState } from "react";
import { Menu, PanelLeftOpen } from "lucide-react";
import { cn } from "cn";

import { useAuth } from "@/components/context/auth";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";

import IconRail from "./(components)/IconRail";
import MediaBar from "./(components)/MediaBar";
import WorkspaceMap from "./(components)/WorkspaceMap";
import WorkspaceSidebar from "./(components)/WorkspaceSidebar";

const ACTION_BUTTON =
  "grid size-9 place-items-center rounded-full border border-white/10 bg-[#111114]/90 text-zinc-100 shadow-lg backdrop-blur-md outline-none transition-colors hover:bg-[#1d1d21] focus-visible:ring-2 focus-visible:ring-[#c4a7f5] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

export default function SpacePage() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const firstName = user?.prenom?.trim();
  const displayName = firstName
    ? firstName.charAt(0).toUpperCase() + firstName.slice(1)
    : "Youmes";

  const focusSearch = useCallback(() => {
    const findVisibleInput = () =>
      Array.from(document.querySelectorAll("[data-people-search]")).find(
        (element) => element.offsetParent !== null,
      );

    const visibleInput = findVisibleInput();
    if (visibleInput) {
      visibleInput.focus();
      return;
    }

    if (window.matchMedia("(max-width: 1023px)").matches) {
      setMobileOpen(true);
    } else {
      setSidebarOpen(true);
    }

    window.setTimeout(() => {
      findVisibleInput()?.focus();
    }, 340);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "f") {
        event.preventDefault();
        focusSearch();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [focusSearch]);

  return (
    <div className="dark flex h-dvh w-full overflow-hidden bg-black text-foreground">
      <div className="hidden h-full shrink-0 lg:flex">
        <IconRail
          displayName={displayName}
          onSearch={focusSearch}
          onToggleSidebar={() => setSidebarOpen((open) => !open)}
        />

        <div
          className={cn(
            "h-full overflow-hidden bg-[#171717] shadow-[6px_0_24px_rgba(0,0,0,.28)] transition-[width] duration-300 ease-out",
            sidebarOpen ? "w-[280px]" : "w-0",
          )}
        >
          <div
            className={cn(
              "h-full w-[280px] transition-opacity duration-200",
              sidebarOpen ? "opacity-100" : "opacity-0",
            )}
          >
            <WorkspaceSidebar
              displayName={displayName}
              onCollapse={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      </div>

      <main className="relative min-w-0 flex-1 overflow-hidden bg-[#83827e]">
        <WorkspaceMap />

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open space menu"
          title="Open space menu"
          className={cn(ACTION_BUTTON, "absolute left-3 top-3 z-30 lg:hidden")}
        >
          <Menu className="size-4" aria-hidden="true" />
        </button>

        {!sidebarOpen ? (
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            title="Open sidebar"
            className={cn(
              ACTION_BUTTON,
              "absolute left-3 top-3 z-30 hidden lg:grid",
            )}
          >
            <PanelLeftOpen className="size-4" aria-hidden="true" />
          </button>
        ) : null}

        <MediaBar displayName={displayName} />
      </main>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          showCloseButton={false}
          className="dark w-[88vw] max-w-[320px] gap-0 border-white/10 bg-[#171717] p-0 text-zinc-100 data-[side=left]:w-[88vw] sm:max-w-[320px]"
        >
          <SheetTitle className="sr-only">Space menu</SheetTitle>
          <SheetDescription className="sr-only">
            Browse floors, invite collaborators, and find people in this Huddle
            space.
          </SheetDescription>
          <WorkspaceSidebar
            displayName={displayName}
            isDrawer
            onCollapse={() => setMobileOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
