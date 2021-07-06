import React, { useEffect } from "react";

export default function Error() {
  useEffect(() => {
    document.title = document.config.title.replace("[SITE]", "Error 404");
  }, []);

  return <>404</>;
}
