
"use client";
import LogoutButton from "@/components/LogoutButton";
import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import dynamic from "next/dynamic";

import {
  LayoutDashboard,
  Code2,
  FolderOpen,
  History,
  Settings,
  UploadCloud,
  FileCode2,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  Menu,
  X,
  FileText,
  Clock,
} from "lucide-react";

import FileExplorer, {
  type ProjectFile,
} from "@/components/FileExplorer";

import { processUploads } from "@/services/fileProcessor";
import {
  saveProject,
  getProjects,
  getProjectById,
} from "@/services/projectApi";
import {
  analyzeProject,
  type CodeReviewResult,
} from "@/services/reviewApi";

const Editor = dynamic(
  () => import("@monaco-editor/react"),
  { ssr: false }
);
type SavedProject = {
  _id: string;
  name: string;
  files: ProjectFile[];
  createdAt: string;
  updatedAt: string;
};
const navigation = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Code Workspace", icon: Code2 },
  { name: "My Projects", icon: FolderOpen },
  { name: "Review History", icon: History },
  { name: "Settings", icon: Settings },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);

  const [projectFiles, setProjectFiles] = useState<ProjectFile[]>([]);
  const [selectedFilePath, setSelectedFilePath] = useState("");
  const [code, setCode] = useState("");

  const [language, setLanguage] =
    useState<"python" | "javascript" | "typescript">("typescript");

  const [uploadError, setUploadError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [projectName, setProjectName] = useState("My Project");

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [projectsError, setProjectsError] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [reviewResult, setReviewResult] = useState<CodeReviewResult | null>(null);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);

  
  async function handleReviewProject() {
    if (!currentProjectId) {
      setReviewError("Please save or open a project before reviewing.");
      return;
    }

    setIsReviewing(true);
    setReviewError("");
    setReviewResult(null);

    try {
      const result = await analyzeProject(currentProjectId);
      setReviewResult(result);
    } catch (error) {
      setReviewError(
        error instanceof Error
          ? error.message
          : "Failed to review project."
      );
    } finally {
      setIsReviewing(false);
    }
  }

  async function handleUpload(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const selectedFiles = Array.from(event.target.files ?? []);

    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    setUploadError("");

    try {
      const newFiles = await processUploads(selectedFiles);

      setProjectFiles((previousFiles) => {
        const fileMap = new Map(
          previousFiles.map((file) => [file.path, file])
        );

        newFiles.forEach((file) => {
          fileMap.set(file.path, file);
        });

        return Array.from(fileMap.values());
      });

      const firstFile = newFiles[0];

      setSelectedFilePath(firstFile.path);
      setCode(firstFile.content);
      setLanguage(firstFile.language);

      const uploadedZip = selectedFiles.find((file) =>
        file.name.toLowerCase().endsWith(".zip")
      );

      if (uploadedZip) {
        setProjectName(
          uploadedZip.name.replace(/\.zip$/i, "")
        );
      } else if (selectedFiles.length > 1) {
        setProjectName("Uploaded Project");
      } else {
        setProjectName(
          selectedFiles[0].name.replace(/\.[^.]+$/, "")
        );
      }

      setActiveTab("Code Workspace");
    } catch (error) {
      setUploadError(
        error instanceof Error
          ? error.message
          : "Something went wrong while uploading."
      );
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  }

  function handleSelectFile(path: string) {
    const selectedFile = projectFiles.find(
      (file) => file.path === path
    );

    if (!selectedFile) return;

    setSelectedFilePath(path);
    setCode(selectedFile.content);
    setLanguage(selectedFile.language);
  }

  function handleCodeChange(value: string | undefined) {
    const updatedCode = value ?? "";

    setCode(updatedCode);

    setProjectFiles((previousFiles) =>
      previousFiles.map((file) =>
        file.path === selectedFilePath
          ? {
              ...file,
              content: updatedCode,
              size: new TextEncoder().encode(updatedCode).length,
            }
          : file
      )
    );
  }
     
  
  async function handleSaveProject() {
    if (projectFiles.length === 0) {
      setSaveMessage("Please upload a project before saving.");
      return;
    }

    setIsSaving(true);
    setSaveMessage("");
    setReviewError("");
    setReviewResult(null);

    try {
      const savedProject = await saveProject(projectName, projectFiles);

      setCurrentProjectId(savedProject._id);
      setSaveMessage("Project saved successfully to MongoDB!");
    } catch (error) {
      setSaveMessage(
        error instanceof Error
          ? error.message
          : "Failed to save project."
      );
    } finally {
      setIsSaving(false);
    }
  }


  const loadSavedProjects = useCallback(async () => {
    setIsLoadingProjects(true);
    setProjectsError("");

    try {
      const projects = await getProjects();
      setSavedProjects(projects);
    } catch (error) {
      setProjectsError(
        error instanceof Error
          ? error.message
          : "Failed to load saved projects."
      );
    } finally {
      setIsLoadingProjects(false);
    }
  }, []);
  useEffect(() => {
    if (activeTab === "My Projects") {
      loadSavedProjects();
    }
  }, [activeTab, loadSavedProjects]);
  
  async function handleOpenSavedProject(id: string) {
    setProjectsError("");
    setReviewError("");
    setReviewResult(null);

    try {
      const project = await getProjectById(id);

      if (!project.files || project.files.length === 0) {
        setProjectsError("This project has no files.");
        return;
      }

      setCurrentProjectId(id);
      setProjectName(project.name);
      setProjectFiles(project.files);

      const firstFile = project.files[0];

      setSelectedFilePath(firstFile.path);
      setCode(firstFile.content);
      setLanguage(firstFile.language);

      setActiveTab("Code Workspace");
    } catch (error) {
      setProjectsError(
        error instanceof Error
          ? error.message
          : "Failed to open project."
      );
    }
  }

  const selectedFile = projectFiles.find(
    (file) => file.path === selectedFilePath
  );

  const lineCount = code.length === 0
    ? 0
    : code.split("\n").length;

  return (
    <div className="app-shell">

      {/* Mobile menu button */}
      <button
        className="mobile-menu-button"
        onClick={() => setMobileMenu(!mobileMenu)}
        aria-label="Toggle navigation"
      >
        {mobileMenu ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon">
            <Code2 size={23} />
          </div>

          <div>
            <h2>CodeReview</h2>
            <span>ACADEMY</span>
          </div>
        </div>

        <div className="sidebar-label">MAIN MENU</div>

        <nav className="navigation">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={
                  activeTab === item.name
                    ? "nav-item active"
                    : "nav-item"
                }
                onClick={() => {
                  setActiveTab(item.name);
                  setMobileMenu(false);
                }}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-status">
            <ShieldCheck size={18} />
            <div>
              <strong>Learning Mode</strong>
              <span>Ready to review</span>
            </div>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* Main content */}
      <main className="main-content">

        {activeTab === "Dashboard" && (
          <>
            <header className="page-header">
              <div>
                <p className="eyebrow">OVERVIEW</p>
                <h1>Welcome to CodeReview Academy</h1>
                <p className="page-description">
                  Improve your coding skills with AI-powered code reviews.
                </p>
              </div>
            </header>

            <section className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon purple">
                  <FolderOpen size={20} />
                </div>
                <p>My Projects</p>
                <h2>{projectFiles.length > 0 ? 1 : 0}</h2>
                <span>Projects uploaded</span>
              </div>

              <div className="stat-card">
                <div className="stat-icon blue">
                  <FileCode2 size={20} />
                </div>
                <p>Source Files</p>
                <h2>{projectFiles.length}</h2>
                <span>Files in workspace</span>
              </div>

              <div className="stat-card">
                <div className="stat-icon green">
                  <ShieldCheck size={20} />
                </div>
                <p>Reviews Completed</p>
                <h2>0</h2>
                <span>AI reviews</span>
              </div>

              <div className="stat-card">
                <div className="stat-icon orange">
                  <Sparkles size={20} />
                </div>
                <p>Learning Score</p>
                <h2>--</h2>
                <span>Not evaluated yet</span>
              </div>
            </section>

            <section className="upload-card">
              <div className="section-heading">
                <div>
                  <h2>Upload Your Project</h2>
                  <p>
                    Start by uploading your Python, JavaScript or
                    TypeScript source files.
                  </p>
                </div>
                <UploadCloud size={27} />
              </div>

              <label className="upload-area">
                <input
                  type="file"
                  multiple
                  accept=".py,.js,.jsx,.ts,.tsx,.zip"
                  onChange={handleUpload}
                  disabled={isUploading}
                />

                <UploadCloud size={36} />

                <strong>
                  {isUploading
                    ? "Processing your files..."
                    : "Click to select files or ZIP"}
                </strong>

                <span>
                  Supported: Python, JavaScript, TypeScript and ZIP
                </span>

                <small>Maximum ZIP size: 10 MB</small>
              </label>

              {uploadError && (
                <div className="upload-error">
                  <AlertTriangle size={17} />
                  {uploadError}
                </div>
              )}

              <p className="upload-note">
                Your files are currently processed in your browser.
                They are not yet saved to a database.
              </p>
            </section>

            <section className="info-card">
              <div className="info-icon">
                <Sparkles size={22} />
              </div>

              <div>
                <h3>What happens next?</h3>
                <p>
                  Your uploaded source files will appear in the Code
                  Workspace. You can explore files and edit code using
                  our Monaco Editor. AI-powered reviews will be added
                  in a later development phase.
                </p>
              </div>
            </section>
          </>
        )}

        {activeTab === "Code Workspace" && (
          <>
            <header className="workspace-heading">
              <div>
                <p className="eyebrow">DEVELOPMENT</p>
                <h1>Code Workspace</h1>
                <p className="page-description">
                  Explore and edit your uploaded project files.
                </p>
              </div>

              <label className="secondary-upload-button">
                <UploadCloud size={16} />
                Upload Project
                <input
                  type="file"
                  multiple
                  accept=".py,.js,.jsx,.ts,.tsx,.zip"
                  onChange={handleUpload}
                  disabled={isUploading}
                />
              </label>
              <button
                className="primary-button"
                onClick={handleSaveProject}
                disabled={isSaving || projectFiles.length === 0}
                >
                {isSaving ? "Saving..." : "Save Project"}
              </button>

              <button
                className="primary-button"
                onClick={handleReviewProject}
                disabled={isReviewing || !currentProjectId}
              >
                {isReviewing ? "Reviewing..." : "Review Code"}
              </button>

            </header>

            <div className="project-summary">
              <span>
                <FolderOpen size={15} />
                {projectName}
              </span>

              <span>
                <FileText size={15} />
                {projectFiles.length} files
              </span>

              <span>
                <Clock size={15} />
                Local workspace
              </span>
            </div>
            {saveMessage && (
              <div className="upload-note">
                {saveMessage}
              </div>
            )}
            {uploadError && (
              <div className="upload-error">
                <AlertTriangle size={17} />
                {uploadError}
              </div>
            )}

            <div className="project-workspace">
              <FileExplorer
                files={projectFiles}
                selectedFile={selectedFilePath}
                onSelect={handleSelectFile}
              />

              <section className="editor-card">
                <div className="editor-header">
                  <div className="file-title">
                    <FileCode2 size={16} />
                    <span>
                      {selectedFilePath || "No file selected"}
                    </span>
                  </div>

                  <span className="language-label">
                    {language.toUpperCase()}
                  </span>
                </div>

                {selectedFile ? (
                  <>
                    <div className="editor-container">
                      <Editor
                        height="500px"
                        language={language}
                        theme="vs-dark"
                        value={code}
                        onChange={handleCodeChange}
                        options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          automaticLayout: true,
                          scrollBeyondLastLine: false,
                          wordWrap: "on",
                          padding: { top: 15 },
                          tabSize: 2,
                        }}
                      />
                    </div>

                    <div className="editor-footer">
                      <span>
                        {language.toUpperCase()}
                      </span>
                      <span>{lineCount} lines</span>
                      <span>Editing locally</span>
                    </div>
                  </>
                ) : (
                  <div className="empty-editor">
                    <Code2 size={42} />
                    <h3>No file selected</h3>
                    <p>
                      Upload a project and select a file to start editing.
                    </p>
                  </div>
                )}
              </section>
            </div>
          </>
        )}
        
        {activeTab === "My Projects" && (
            <section className="placeholder-page">
              <div className="workspace-heading">
                <div>
                  <p className="eyebrow">YOUR WORK</p>
                  <h1>My Projects</h1>
                  <p className="page-description">
                    View and reopen your saved coding projects.
                  </p>
                </div>


            {reviewError && (
              <div className="upload-error">
                <AlertTriangle size={17} />
                {reviewError}
              </div>
            )}

            {reviewResult && (
              <section className="editor-card">
                <div className="editor-header">
                  <h2>AI Code Review Results</h2>
                  <span className="language-label">
                    {reviewResult.status}
                  </span>
                </div>

                <div className="project-summary">
                  <span>
                    Overall Score: {reviewResult.overallScore}/100
                  </span>
                  <span>
                    Files Reviewed: {reviewResult.filesReviewed}
                  </span>
                  <span>
                    Issues Found: {reviewResult.totalIssues}
                  </span>
                </div>

                <p>{reviewResult.summary}</p>

                {reviewResult.fileResults.map((file, index) => (
                  <div key={`${file.filePath}-${index}`}>
                    <h3>{file.filePath}</h3>

                    {file.comments.length === 0 ? (
                      <p>No issues found in this file.</p>
                    ) : (
                      file.comments.map((comment, commentIndex) => (
                        <div
                          key={`${comment.lineNumber}-${commentIndex}`}
                          className="upload-note"
                        >
                          <strong>
                            {comment.severity.toUpperCase()} — Line{" "}
                            {comment.lineNumber}
                          </strong>

                          <h4>{comment.title}</h4>
                          <p>{comment.explanation}</p>

                          <p>
                            <strong>Suggested Fix:</strong>{" "}
                            {comment.suggestedFix}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                ))}
              </section>
            )}


                <button
                  className="primary-button"
                  onClick={loadSavedProjects}
                  disabled={isLoadingProjects}
                >
                  {isLoadingProjects ? "Refreshing..." : "Refresh Projects"}
                </button>
              </div>

              {projectsError && (
                <div className="upload-error">
                  <AlertTriangle size={17} />
                  {projectsError}
                </div>
              )}

              {isLoadingProjects ? (
                <p>Loading your saved projects...</p>
              ) : savedProjects.length === 0 ? (
                <div>
                  <FolderOpen size={40} />
                  <h3>No saved projects yet</h3>
                  <p>
                    Upload a project in Code Workspace and save it to see it here.
                  </p>
                  <button
                    className="primary-button"
                    onClick={() => setActiveTab("Code Workspace")}
                  >
                    Go to Code Workspace
                  </button>
                </div>
              ) : (
                <div className="stats-grid">
                  {savedProjects.map((project) => (
                    <div className="stat-card" key={project._id}>
                      <div className="stat-icon purple">
                        <FolderOpen size={20} />
                      </div>

                      <h3>{project.name}</h3>

                      <p>{project.files.length} files</p>

                      <span>
                        Saved on{" "}
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>

                      <button
                        className="primary-button"
                        onClick={() => handleOpenSavedProject(project._id)}
                      >
                        Open Project
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
        )}

        {activeTab !== "Dashboard" &&
          activeTab !== "Code Workspace" &&
          activeTab !== "My Projects" && (
            <section className="placeholder-page">
              <div className="info-icon">
                <Sparkles size={25} />
              </div>
              <h1>{activeTab}</h1>
              <p>
                This section will be implemented in a later development phase.
              </p>
              <button
                className="primary-button"
                onClick={() => setActiveTab("Dashboard")}
              >
                Return to Dashboard
              </button>
            </section>
          )}

      </main>
    </div>
  );
}
