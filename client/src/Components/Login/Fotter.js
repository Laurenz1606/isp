import React from "react";

export default function Fotter() {
  return (
    <>
      <div
        className="absolute bottom-6 text-white text-opacity-0 select-none"
        style={{
          borderBottom: "solid 30px #ffffff",
          borderRight: "solid 20px transparent",
          borderLeft: "solid 20px transparent",
        }}
      >
        ©2021 mk:returddddn
      </div>
      <div className="z-20 absolute bottom-0 inset-x-0 bg-white flex items-center justify-around pt-2 pb-0 text-lg font-semibold">
        <a
          href="https://mk-return.de/impressum"
          className="relative -top-1 font-normal"
        >
          Impressum
        </a>
        <a href="https://mk-return.de" className="relative -top-4">
          ©2021 mk:return
        </a>
        <a
          href="https://mk-return.de/datenschutz/"
          className="relative -top-1 font-normal"
        >
          Datenschutz
        </a>
      </div>
    </>
  );
}
