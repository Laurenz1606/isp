import React from "react";
import DocumentCard from "./DocumentCard";

export default function ItemsGrid({
  folders,
  loading,
  documents,
  FolderPath,
  setLoading,
  setFolders,
  editMode,
  toggle,
}) {
  return (
    <>
      {editMode === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 focus:outline-none outline-none">
          {loading
            ? "Laden ..."
            : folders.map((folder) => {
                return (
                  <DocumentCard
                    editMode={editMode}
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
                );
              })}
          {loading
            ? ""
            : documents.map((document) => {
                console.log(document);
                return (
                  <DocumentCard
                    editMode={editMode}
                    type="document"
                    key={document._id}
                    title={document.name}
                    id={document._id}
                    changedAt={document.changedDate}
                    createdAt={document.createDate}
                    publicState={document.public}
                    roles={document.roles}
                    owner={document.owner}
                    currPath={FolderPath}
                  />
                );
              })}
        </div>
      ) : (
        <form
          id="contentForm"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 focus:outline-none outline-none"
        >
          {loading
            ? "Laden ..."
            : folders.map((folder) => (
                <DocumentCard
                  toggle={toggle}
                  editMode={editMode}
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
                  toggle={toggle}
                  editMode={editMode}
                  type="document"
                  key={document._id}
                  title={document.name}
                  id={document._id}
                  changedAt={document.changedDate}
                  createdAt={document.createDate}
                  roles={document.roles}
                  publicState={document.public}
                  owner={document.owner}
                  currPath={FolderPath}
                />
              ))}
          <button type="submit" id="deletedocumentbutton"></button>
        </form>
      )}
    </>
  );
}
