
import type {
  ReviewComment,
  ReviewSeverity,
} from "../types/review.types.js";

interface AnalyzeFileInput {
  path: string;
  content: string;
  language: "python" | "javascript" | "typescript";
}

export function analyzeFile(
  file: AnalyzeFileInput
): ReviewComment[] {
  const comments: ReviewComment[] = [];
  const lines = file.content.split("\n");

  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    const trimmedLine = line.trim();

    if (!trimmedLine) return;

    // Detect console.log statements.
    if (
      file.language !== "python" &&
      /\bconsole\.log\s*\(/.test(line)
    ) {
      comments.push({
        filePath: file.path,
        lineNumber,
        severity: "low",
        title: "Console logging detected",
        explanation:
          "Console logging may expose debugging information in production.",
        suggestedFix:
          "Remove this statement or use a proper logging utility.",
      });
    }

    // Detect Python print statements.
    if (
      file.language === "python" &&
      /\bprint\s*\(/.test(line)
    ) {
      comments.push({
        filePath: file.path,
        lineNumber,
        severity: "low",
        title: "Print statement detected",
        explanation:
          "Print statements are useful for debugging but may not be suitable for production code.",
        suggestedFix:
          "Consider using Python's logging module.",
      });
    }

    // Detect hardcoded credentials.
    if (
      /\b(password|api[_-]?key|secret|token)\b\s*[:=]\s*["'][^"']+["']/i.test(line)
    ) {
      comments.push({
        filePath: file.path,
        lineNumber,
        severity: "critical",
        title: "Possible hardcoded credential",
        explanation:
          "This line appears to contain a hardcoded password, API key, secret, or token.",
        suggestedFix:
          "Move the credential into an environment variable and rotate it if it is real.",
      });
    }

    // Detect empty JavaScript/TypeScript catch blocks.
    if (
      file.language !== "python" &&
      /\bcatch\s*(?:\([^)]*\))?\s*\{\s*\}/.test(trimmedLine)
    ) {
      comments.push({
        filePath: file.path,
        lineNumber,
        severity: "medium",
        title: "Empty catch block",
        explanation:
          "This catch block silently ignores errors, making debugging difficult.",
        suggestedFix:
          "Handle the error, log it safely, or rethrow it.",
      });
    }
  });

  return comments;
}
