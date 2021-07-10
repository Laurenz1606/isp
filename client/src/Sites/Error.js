import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Login/Fotter";

export default function Error() {
  useEffect(() => {
    document.title = document.config.title.replace("[SITE]", "Error 404");
  }, []);

  return (
    <>
      <div className="login-bg"></div>
      <div className="z-20 top-0 left-0 absolute w-screen h-screen flex flex-col items-center justify-center">
        <div className="bg-white opacity-80 p-6 w-screen">
          <div className="text-lg font-bold mr-24 flex flex-col items-center justify-center space-y-4">
            <h1 className="text-6xl text-black">404 Error</h1>
            <h3 className="text-2xl text-black">Die gesuchte Seite konnte nicht gefunden werden :(</h3>
            <Link to="/dashboard" className="hover:underline text-blue-600">Zurück zum Dashboard</Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
