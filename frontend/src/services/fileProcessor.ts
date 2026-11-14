
import JSZip from "jszip";
import type { ProjectFile } from "../components/FileExplorer";

const SUPPORTED_EXTENSIONS = ["py", "js", "jsx", "ts", "tsx"];

const MAX_FILE_SIZE = 1024 * 1024;
const MAX_ZIP_SIZE = 10 * 1024 * 1024;
const MAX_TOTAL_SIZE = 5 * 1024 * 1024;
const MAX_FILES = 100;

function getLanguage(path: string): ProjectFile["language"] {
  const extension = path.split(".").pop()?.toLowerCase();

  if (extension === "py") return "python";
  if (extension === "ts" || extension === "tsx") {
    return "typescript";
  }

  return "javascript";
}

function isSupported(path: string): boolean {
  const filename = path.split("/").pop() || "";
  const extension = filename.split(".").pop()?.toLowerCase();

  return SUPPORTED_EXTENSIONS.includes(extension || "");
}

function validatePath(path: string): string {
  const normalized = path
    .replace(/\\/g, "/")
    .replace(/^(\.\/)+/, "");

  if (
    !normalized ||
    normalized.startsWith("/") ||
    /^[a-zA-Z]:/.test(normalized) ||
    normalized.split("/").some(
      (part) => part === ".." || part === "." || part === ""
    ) ||
    normalized.includes("\0")
  ) {
    throw new Error("Unsafe file path detected in ZIP.");
  }

  return normalized;
}

function shouldIgnore(path: string): boolean {
  const ignored = [
    "node_modules",
    ".git",
    "dist",
    "build",
    "__pycache__",
    ".venv",
    "__MACOSX",
  ];

  return path.split("/").some((part) => ignored.includes(part));
}

function createFile(
  path: string,
  content: string,
  size: number
): ProjectFile {
  return {
    path,
    content,
    size,
    language: getLanguage(path),
  };
}

export async function processUploads(
  uploadedFiles: File[]
): Promise<ProjectFile[]> {
  const results: ProjectFile[] = [];
  let totalSize = 0;

  for (const uploadedFile of uploadedFiles) {
    const extension = uploadedFile.name
      .split(".")
      .pop()
      ?.toLowerCase();

    if (extension === "zip") {
      if (uploadedFile.size > MAX_ZIP_SIZE) {
        throw new Error("ZIP file must be smaller than 10 MB.");
      }

      const zip = await JSZip.loadAsync(uploadedFile, {
        checkCRC32: true,
      });

      const entries = Object.values(zip.files);

      for (const entry of entries) {
        if (entry.dir) continue;

        const safePath = validatePath(entry.name);

        if (shouldIgnore(safePath)) continue;
        if (!isSupported(safePath)) continue;

        if (results.length >= MAX_FILES) {
          throw new Error("Maximum of 100 source files allowed.");
        }

        const content = await entry.async("string");
        const size = new TextEncoder().encode(content).length;

        if (size > MAX_FILE_SIZE) {
          throw new Error(
            `${safePath} exceeds the 1 MB file limit.`
          );
        }

        totalSize += size;

        if (totalSize > MAX_TOTAL_SIZE) {
          throw new Error("Extracted project exceeds 5 MB.");
        }

        results.push(createFile(safePath, content, size));
      }
    } else {
      if (!isSupported(uploadedFile.name)) {
        throw new Error(
          `Unsupported file: ${uploadedFile.name}`
        );
      }

      if (uploadedFile.size > MAX_FILE_SIZE) {
        throw new Error(
          `${uploadedFile.name} exceeds the 1 MB limit.`
        );
      }

      const content = await uploadedFile.text();
      totalSize += uploadedFile.size;

      if (totalSize > MAX_TOTAL_SIZE) {
        throw new Error("Project exceeds 5 MB.");
      }

      results.push(
        createFile(
          uploadedFile.name,
          content,
          uploadedFile.size
        )
      );
    }
  }

  if (results.length === 0) {
    throw new Error(
      "No supported Python, JavaScript or TypeScript files were found. Check that your ZIP contains .py, .js, .jsx, .ts or .tsx files."
    );
  }

  const uniqueFiles = new Map<string, ProjectFile>();

  results.forEach((file) => {
    uniqueFiles.set(file.path, file);
  });

  return Array.from(uniqueFiles.values());
}
