import express from "express";
import { createWorkspace, joinWorkspace, getWorkspaces } from "../controllers/workspace.controller.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
router.post("/create", verifyToken, createWorkspace);
router.post("/join", verifyToken, joinWorkspace);
router.get("/", verifyToken, getWorkspaces);

export default router;