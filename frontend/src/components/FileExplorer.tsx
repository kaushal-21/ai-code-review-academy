
import { Folder, FolderOpen, FileCode2 } from "lucide-react";

export type ProjectFile = {
  path: string;
  content: string;
  size: number;
  language: "python" | "javascript" | "typescript";
};

type FileExplorerProps = {
  files: ProjectFile[];
  selectedFile: string;
  onSelect: (path: string) => void;
};

export default function FileExplorer({
  files,
  selectedFile,
  onSelect,
}: FileExplorerProps) {
  const folders: Record<string, ProjectFile[]> = {};

  files.forEach((file) => {
    const parts = file.path.split("/");
    const folder =
      parts.length > 1
        ? parts.slice(0, -1).join("/")
        : "Root";

    if (!folders[folder]) {
      folders[folder] = [];
    }

    folders[folder].push(file);
  });

  return (
    <div className="file-explorer">
      <div className="explorer-heading">
        <FolderOpen size={16} />
        <span>PROJECT FILES</span>
      </div>

      {Object.entries(folders).map(([folder, items]) => (
        <div className="folder-group" key={folder}>
          <div className="folder-title">
            {folder === "Root" ? (
              <FolderOpen size={15} />
            ) : (
              <Folder size={15} />
            )}
            {folder}
          </div>

          {items.map((file) => (
            <button
              key={file.path}
              className={
                "file-item " +
                (selectedFile === file.path ? "selected" : "")
              }
              onClick={() => onSelect(file.path)}
            >
              <FileCode2 size={15} />
              <span>{file.path.split("/").pop()}</span>
            </button>
          ))}
        </div>
      ))}

      {files.length === 0 && (
        <p className="empty-files">No project files yet.</p>
      )}
    </div>
  );
}
