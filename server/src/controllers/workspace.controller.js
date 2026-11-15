import { prisma } from "../lib/prisma.js";

export const getWorkspaces = async (req, res) => {
    try {
        const userId = req.user.userId;

        const memberships = await prisma.member.findMany({
            where: { userId: userId },
            include: {
                workspace: {
                    include: {
                        map: true
                    }
                }
            }
        });

        const workspaces = memberships.map(m => m.workspace);

        return res.status(200).json({ 
            count: workspaces.length,
            workspaces 
        });

    } catch (error) {
        console.error("An error occurred while fetching workspaces:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};


export const createWorkspace = async (req, res) => {
    try {
        const { nom, description, mapId } = req.body;
        const userId = req.user.userId;

        if (!nom || !mapId) {
            return res.status(400).json({ message: "Name and mapId are required." });
        }

        const mapExists = await prisma.workspaceMap.findUnique({
            where: { id: parseInt(mapId) }
        });
        if (!mapExists) {
            return res.status(404).json({ message: "The specified map does not exist." });
        }

        const newWorkspace = await prisma.workspace.create({
            data: {
                nom: nom,
                description: description,
                ownerId: userId,
                mapId: parseInt(mapId),
                members: {
                    create: {
                        userId: userId,
                        role: "admin",
                        posX: 400,
                        posY: 300
                    }
                }
            }
        });

        return res.status(201).json({
            message: "Workspace created successfully.",
            workspace: newWorkspace
        });

    } catch (error) {
        console.error("Error occurred while creating the workspace:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

export const joinWorkspace = async (req, res) => {
    try {
        const { workspaceId } = req.body;
        const userId = req.user.userId;

        if (!workspaceId) {
            return res.status(400).json({ message: "Le workspaceId est obligatoire." });
        }

        const parsedWorkspaceId = parseInt(workspaceId);

        const workspace = await prisma.workspace.findUnique({
            where: { id: parsedWorkspaceId }
        });

        if (!workspace) {
            return res.status(404).json({ message: "This Workspace does not exist." });
        }

        //mmmm , we search for member with the same userId and workspaceId to check if the user is already a member of the workspace
        const existingMember = await prisma.member.findUnique({
            where: {
                userId_workspaceId: { //this is the @@unique constraint in our schema!
                    userId: userId,
                    workspaceId: parsedWorkspaceId
                }
            }
        });

        if (existingMember) {
            return res.status(400).json({ message: "You are already a member of this workspace." });
        }

        const newMember = await prisma.member.create({
            data: {
                userId: userId,
                workspaceId: parsedWorkspaceId,
                role: "member",
                posX: 400,
                posY: 300
            }
        });

        return res.status(201).json({
            message: "You have successfully joined the workspace.",
            member: newMember
        });

    } catch (error) {
        console.error("Error occurred while joining the workspace:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};