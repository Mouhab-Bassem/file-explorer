import React, { useState } from "react";

import ContextMenu from "../ContextMenu";
import { Files as FilesData } from "./mocks";
import "./style.css";


// these icons should be exported from icons folder
const ClosedFolderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="#000"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-folder"
  >
    <path d="M22 19V7a2 2 0 0 0-2-2H9l-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z"></path>
  </svg>
);

const OpenFolderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-folder-open"
  >
    <path d="M22 19V7a2 2 0 0 0-2-2H9l-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z"></path>
    <path d="M2 10l10-2 10 2"></path>
  </svg>
);

const FileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-file"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
  </svg>
);


type FileNode = {
  type: string;
  name: string;
  meta?: string;
  data?: FileNode[];
};

// this could be component
const FileStructure: React.FC<{ filesData: FileNode }> = ({ filesData }) => {
  const [visible, setVisible] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
  }>({ x: 0, y: 0, visible: false });

  const { type, name, data } = filesData;
  const hasChildren = data && data.length >= 1;

  const toggleVisible = () => {
    if (hasChildren) {
      setVisible(!visible);
    }
  };

  const handleRightClick = (e: React.MouseEvent) => {
    if (type !== "folder") {
      e.preventDefault();
      setContextMenu({ visible: true, x: e.pageX, y: e.pageY });
    }
  };

  const RenderFileIcon = () => {
    switch (type) {
      case "folder":
        return visible ? <OpenFolderIcon /> : <ClosedFolderIcon />;
      case "file":
        return <FileIcon />;
      default:
        return <ClosedFolderIcon />;
    }
  };

  return (
    <li>
      <div
        className="file-explorer-list-label"
        onClick={toggleVisible}
        onContextMenu={(e: any) => handleRightClick(e)}
      >
        <span>
          <RenderFileIcon />
        </span>
        <p>{name}</p>
      </div>

      {hasChildren && visible ? (
        <ul className="file-explorer-list-nested">
          {data.map((child: FileNode, index: number) => (
            <FileStructure key={index} filesData={child} />
          ))}
        </ul>
      ) : null}

      <ContextMenu
        visible={contextMenu.visible}
        onClose={() => setContextMenu({ ...contextMenu, visible: false })}
        x={contextMenu.x}
        y={contextMenu.y}
        actions={[
          { name: "Copy", onClick: () => console.log("Copy -->", name) },
          { name: "Rename", onClick: () => console.log("Rename -->", name) },
          { name: "Delete", onClick: () => console.log("Delete -->", name) },
        ]}
      />
    </li>
  );
};


const FileExplorer: React.FC = () => {
  const [data] = useState<FileNode>(FilesData);
  // fetching data logic should be here

  return (
    <div className="file-explorer">
      <ul className="file-explorer-list">
        <FileStructure filesData={data} />
      </ul>
    </div>
  );
};

export default FileExplorer;
