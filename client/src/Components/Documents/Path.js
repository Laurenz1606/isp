import React from "react";
import FolderLink from "./FolderLink";

export default function Path({ paths, fullpaths }) {
  return (
    <div className="flex my-3">
    <FolderLink
      link="/documents?path=/"
      pathName="Home"
    />
      {paths.map((newPath, i) => (
        <FolderLink
          link={"/documents?path=/" + fullpaths[i] + "/"}
          pathName={newPath}
          key={i}
        />
      ))}
    </div>
  );
}
