"use client";
import { Clientaxios } from "@/lib/axios";

export const Connect_Dash = {
  getWorkspaces: async () => {
    return await Clientaxios.get("workspaces");
  },
  postWorkspace: async (data) => {
    return await Clientaxios.post("workspaces/create", data);
  },
};
