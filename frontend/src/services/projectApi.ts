
import type { ProjectFile } from "../components/FileExplorer";

export async function saveProject(name: string, files: ProjectFile[]) {
  const response = await fetch("/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, files }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to save project.");
  }

  return result.data;
}

export async function getProjects() {
  const response = await fetch("/api/projects");

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch projects.");
  }

  return result.data;
}

export async function getProjectById(id: string) {
  const response = await fetch(`/api/projects/${encodeURIComponent(id)}`);

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch project.");
  }

  return result.data;
}
