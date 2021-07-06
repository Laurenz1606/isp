import {
  CogIcon,
  DocumentAddIcon,
  FolderAddIcon,
  PencilIcon,
  TrashIcon,
  XIcon,
} from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import DocumentHeaderButton from "../Components/Documents/DocumentHeaderButton";
import Modal from "../Components/Documents/DocumentModal";
import RenameModal from "../Components/Documents/RenameModal";
import { fetcher } from "../Functions/AuthFunctions";
import { useQuery } from "../Functions/ReactRouterDomHooks";
import ItemsGrid from "../Components/Documents/ItemsGrid";
import { StringToArray } from "../Functions/CommonFunctions";
import Path from "../Components/Documents/Path";

export default function Documents() {
  useEffect(() => {
    document.title = document.config.title.replace("[SITE]", "Dokumente");
  }, []);


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
  const [RenameModalIsOpen, setRenameModalIsOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [edit, setEdit] = useState(0);
  const [checkedElements, setCheckedElements] = useState([]);

  function joinPaths(pathArray) {
    let newPathArray = [];
    let resultPaths = [];
    for (let newPath of pathArray) {
      newPathArray.push(newPath);
      resultPaths.push(newPathArray.join("/"));
    }
    return resultPaths;
  }

  function toggleItem(id, type, state) {
    if (state) {
      const parent = FolderPath.split("/")[FolderPath.split("/").length - 2];
      setCheckedElements((prev) => [...prev, { id, type, parent }]);
    } else {
      setCheckedElements((prev) => prev.filter((ele) => ele.id !== id));
    }
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
  }, [FolderPath, history, refetch]);

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
        <div className="block md:flex-wrap md:flex">
          {edit === 0 ? (
            <>
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
              <DocumentHeaderButton
                action={() => {
                  setCheckedElements([]);
                  setEdit(1);
                }}
                icon={<CogIcon className="w-8 h-8 -ml-1" />}
                text="Bearbeiten"
              />
            </>
          ) : (
            <>
              <DocumentHeaderButton
                action={() => setRenameModalIsOpen((prev) => !prev)}
                icon={<PencilIcon className="w-8 h-8" />}
                text="Umbenennen"
              />
              <DocumentHeaderButton
                type="delete"
                action={async () => {
                  const res = await fetcher(
                    "/documents/delete",
                    "DELETE",
                    checkedElements
                  );
                  if (res.code === 0) {
                    setRefetch((old) => !old);
                    setEdit(0);
                  }
                }}
                icon={<TrashIcon className="w-8 h-8" />}
                text="Löschen"
              />
              <DocumentHeaderButton
                type="delete"
                action={() => setEdit(0)}
                icon={<XIcon className="w-8 h-8 -ml-1" />}
                text="Abbrechen"
              />
            </>
          )}
        </div>
        <Path paths={fetchedPaths} fullpaths={fullPaths} />
        <ItemsGrid
          toggle={toggleItem}
          editMode={edit}
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
      <RenameModal
        setEdit={setEdit}
        isOpen={RenameModalIsOpen}
        setIsOpen={setRenameModalIsOpen}
        data={checkedElements}
        setRefetch={setRefetch}
      />
    </>
  );
}
