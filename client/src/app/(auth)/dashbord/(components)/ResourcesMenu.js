import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookOpen, Globe, LifeBuoy, Users } from "lucide-react";
import { toast } from "sonner";

export function ResourcesMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Resources"
        render={
          <Button
            type="button"
            variant="ghost"
            size="lg"
            className="rounded-full px-2.5 text-sm text-muted-foreground hover:text-foreground"
          />
        }
      >
        <Globe data-icon="inline-start" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => toast.info("Documentation is coming soon.")}
          >
            <BookOpen aria-hidden="true" />
            Documentation
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => toast.info("Community is coming soon.")}
          >
            <Users aria-hidden="true" />
            Community
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => toast.info("Support is coming soon.")}
          >
            <LifeBuoy aria-hidden="true" />
            Support
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
