import { toast } from "sonner";

export async function copyInviteLink() {
  const url = window.location.href;

  try {
    if (!navigator.clipboard) throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText(url);
    toast.success("Invite link copied", {
      description: "Share it with someone you want in this space.",
    });
    return true;
  } catch {
    try {
      const field = document.createElement("textarea");
      field.value = url;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      const copied = document.execCommand("copy");
      document.body.removeChild(field);

      if (!copied) throw new Error("Copy failed");

      toast.success("Invite link copied", {
        description: "Share it with someone you want in this space.",
      });
      return true;
    } catch {
      toast.error("Couldn't copy the invite link", {
        description: "You can copy the address from your browser instead.",
      });
      return false;
    }
  }
}
