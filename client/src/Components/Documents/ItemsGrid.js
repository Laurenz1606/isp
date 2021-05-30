import React from "react";
import DocumentCard from "./DocumentCard";

export default function ItemsGrid({
  folders,
  loading,
  documents,
  FolderPath,
  setLoading,
  setFolders,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 focus:outline-none outline-none">
      {loading
        ? "Laden ..."
        : folders.map((folder) => (
          <DocumentCard
            type="folder"
            owner={folder.owner}
            title={folder.name}
            key={folder._id}
            createdAt={folder.createDate}
            id={folder._id}
            currPath={FolderPath}
            setFolder={setFolders}
            setLoading={setLoading}
          />
        ))}
      {loading
        ? ""
        : documents.map((document) => (
          <DocumentCard
            type="document"
            key={document._id}
            title={document.name}
            id={document._id}
            changedAt={document.changedDate}
            createdAt={document.createDate}
            roles={document.roles}
            owner={document.owner}
            currPath={FolderPath}
          />
        ))}
    </div>
  );
}
