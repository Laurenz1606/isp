import React, { useEffect } from "react";

export default function Mails() {
  useEffect(() => {
    document.title = document.config.title.replace("[SITE]", "E-Mails");
  }, []);

  return <></>;
}
