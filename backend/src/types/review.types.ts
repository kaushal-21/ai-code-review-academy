
export type ReviewSeverity = "low" | "medium" | "high" | "critical";

export type ReviewStatus =
  | "APPROVED"
  | "COMMENTED"
  | "CHANGES_REQUESTED";

export interface ReviewComment {
  filePath: string;
  lineNumber: number;
  severity: ReviewSeverity;
  title: string;
  explanation: string;
  suggestedFix: string;
}

export interface FileReviewResult {
  filePath: string;
  language: "python" | "javascript" | "typescript";
  comments: ReviewComment[];
}

export interface CodeReviewResult {
  projectId: string;
  overallScore: number;
  status: ReviewStatus;
  summary: string;
  filesReviewed: number;
  totalIssues: number;
  fileResults: FileReviewResult[];
}
