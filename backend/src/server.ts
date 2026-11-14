
import express, { Request, Response } from "express";
import { requireInternalAuth } from "./middleware/requireInternalAuth.js";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import { Project } from "./models/Project.js";
import { reviewCodeWithGemini } from "./services/geminiReview.js";
import type {
  ReviewComment,
  FileReviewResult,
} from "./types/review.types.js";

interface ReviewableProjectFile {
  path: string;
  content: string;
  language: "python" | "javascript" | "typescript";
}
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
}));

app.use(express.json({ limit: "7mb" }));


app.post("/api/projects", requireInternalAuth, async (req: Request, res: Response) => {
  try {
    const { name, files } = req.body;

    if (
      typeof name !== "string" ||
      !name.trim() ||
      !Array.isArray(files) ||
      files.length === 0
    ) {
      res.status(400).json({
        status: "error",
        message: "Project name and at least one file are required.",
      });
      return;
    }

    const newProject = await Project.create({
      ownerId: res.locals.userId,
      name: name.trim(),
      files,
    });

    res.status(201).json({
      status: "success",
      message: "Project saved successfully!",
      data: newProject,
    });
  } catch (error) {
    console.error("Project save error:", error);

    res.status(500).json({
      status: "error",
      message: "Could not save project.",
    });
  }
});


app.get("/api/projects", requireInternalAuth, async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({
       ownerId: res.locals.userId,
    })
      .sort({ createdAt: -1 })
      .select("-files.content");

    res.json({
      status: "success",
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error("Project retrieval error:", error);

    res.status(500).json({
      status: "error",
      message: "Could not retrieve projects.",
    });
  }
});


// Retrieve one complete project, including its source code
app.get("/api/projects/:id", requireInternalAuth, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    // Check that the project ID has a valid MongoDB ObjectId format
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      res.status(400).json({
        status: "error",
        message: "Invalid project ID.",
      });
      return;
    }

    const project = await Project.findById({
        _id: id,
        ownerId: res.locals.userId,
    });

    if (!project) {
      res.status(404).json({
        status: "error",
        message: "Project not found.",
      });
      return;
    }

    res.json({
      status: "success",
      data: project,
    });
  } catch (error) {
    console.error("Single project retrieval error:", error);

    res.status(500).json({
      status: "error",
      message: "Could not retrieve project.",
    });
  }
});


app.post("/api/reviews/analyze", requireInternalAuth, async (req: Request, res: Response) => {
  try {
    const { projectId } = req.body;

    if (
      typeof projectId !== "string" ||
      !/^[0-9a-fA-F]{24}$/.test(projectId)
    ) {
      res.status(400).json({
        status: "error",
        message: "A valid project ID is required.",
      });
      return;
    }

    const project = await Project.findOne({
      _id: projectId,
      ownerId: res.locals.userId,
    });

    if (!project) {
      res.status(404).json({
        status: "error",
        message: "Project not found.",
      });
      return;
    }

    const projectFiles = project.files as unknown as ReviewableProjectFile[];

    const fileResults: FileReviewResult[] = [];

    for (const file of projectFiles) {
      const comments = await reviewCodeWithGemini({
        path: file.path,
        content: file.content,
        language: file.language,
      });

      fileResults.push({
        filePath: file.path,
        language: file.language,
        comments,
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    
    const totalIssues = fileResults.reduce(
      (total: number, file) => total + file.comments.length,
      0
    );

    const overallScore = Math.max(
      0,
      100 - totalIssues * 10
    );

    const hasCriticalIssues = fileResults.some((file) =>
      file.comments.some((comment: ReviewComment) => comment.severity === "critical")
    );

    const status = hasCriticalIssues || overallScore < 60
      ? "CHANGES_REQUESTED"
      : totalIssues > 0
        ? "COMMENTED"
        : "APPROVED";

    res.json({
      status: "success",
      message: "Code review completed successfully.",
      data: {
        projectId: project._id,
        overallScore,
        status,
        summary: `Reviewed ${project.files.length} files and found ${totalIssues} potential issues.`,
        filesReviewed: project.files.length,
        totalIssues,
        fileResults,
      },
    });
  } catch (error) {
    console.error("Code review error:", error);

    res.status(500).json({
      status: "error",
      message: "Could not complete code review.",
    });
  }
});



app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "AI Code Review Academy Backend is running!",
    status: "success",
  });
});

app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    status: "OK",
    message: "Backend API is healthy.",
    timestamp: new Date().toISOString(),
  });
});

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Backend server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start backend:", error);
    process.exit(1);
  }
}

startServer();
