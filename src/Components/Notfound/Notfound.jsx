import React from "react";
import notFound from "../../Assets/Images/notfound.webp";
import { Link } from "react-router-dom";

export default function Notfound() {
  return (
    <>
      <div className="notFound min-vh-100 d-flex justify-content-center align-items-center flex-column">
        <img src={notFound} className="d-block" alt="not found" />
        <Link to={"/"}>
          <button className="btn-style text-center mt-3 px-4">
            {" "}
            Back To Home
          </button>
        </Link>
      </div>
    </>
  );
}
