import { DocumentAddIcon, FolderAddIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import DocumentHeaderButton from "../Components/Documents/DocumentHeaderButton";
import Modal from "../Components/Documents/DocumentModal";
import { fetcher } from "../Functions/AuthFunctions";
import { useQuery } from "../Functions/ReactRouterDomHooks";
import ItemsGrid from "../Components/Documents/ItemsGrid";
import { StringToArray } from "../Functions/CommonFunctions";
import Path from "../Components/Documents/Path";

export default function Documents() {
  const history = useHistory();
  const FolderPath = useQuery().get("path");
  const [documents, setDocuments] = useState([]);
  const [folders, setFolders] = useState([]);
  const [path, setPath] = useState([]);
  const [fetchedPaths, setFetchedPaths] = useState([]);
  const [fullPaths, setFullPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [DocumentModalIsOpen, setDocumentModalOpen] = useState(false);
  const [FolderModalIsOpen, setFolderModalOpen] = useState(false);

  function joinPaths(pathArray) {
    let newPathArray = [];
    let resultPaths = [];
    for (let newPath of pathArray) {
      newPathArray.push(newPath);
      resultPaths.push(newPathArray.join("/"));
    }
    return resultPaths;
  }

  useEffect(() => {
    if (FolderPath !== null) {
      if (FolderPath.startsWith("/")) {
        (async () => {
          let res = await fetcher("/documents/get?path=" + FolderPath, "GET");
          setDocuments(
            res.documents.sort((a, b) => b.changedDate - a.changedDate)
          );
          setFolders(res.folders.sort((a, b) => b.createDate - a.createDate));
          setLoading(false);
        })();
        setPath(StringToArray(FolderPath, "/"));
      } else {
        history.push("/documents?path=/");
      }
    } else {
      history.push("/documents?path=/");
    }
  }, [FolderPath, history]);
  useEffect(() => {
    const getNames = async () => {
      let res = await fetcher("/documents/getpaths", "POST", { path });
      setFetchedPaths(res.paths);
      setFullPaths(joinPaths(path));
    };
    getNames();
  }, [path]);
  return (
    <>
      <div className="">
        <div className="flex space-x-5">
          <DocumentHeaderButton
            action={() => setDocumentModalOpen((prev) => !prev)}
            icon={<DocumentAddIcon className="w-8 h-8" />}
            text="Neues Dokument"
          />
          <DocumentHeaderButton
            action={() => setFolderModalOpen((prev) => !prev)}
            icon={<FolderAddIcon className="w-8 h-8" />}
            text="Neuer Ordner"
          />
        </div>
        <Path paths={fetchedPaths} fullpaths={fullPaths} />
        <ItemsGrid
          setLoading={setLoading}
          setFolders={setFolders}
          setDocuments={setDocuments}
          documents={documents}
          folders={folders}
          loading={loading}
          FolderPath={FolderPath}
        />
      </div>
      <Modal
        isOpen={DocumentModalIsOpen}
        setIsOpen={setDocumentModalOpen}
        type="document"
        FolderPath={FolderPath}
      />
      <Modal
        isOpen={FolderModalIsOpen}
        setIsOpen={setFolderModalOpen}
        type="folder"
        FolderPath={FolderPath}
      />
    </>
  );
}
