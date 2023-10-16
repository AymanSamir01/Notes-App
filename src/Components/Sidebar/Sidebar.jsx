import { NavLink, useNavigate } from "react-router-dom";
import style from "./Sidebar.module.css";
import { useContext } from "react";
import { NoteContext } from "../../Context/NoteContext";
import { showModalToAdd } from "../../Utils/Note";

export default function Sidebar({ isMinimized, setIsMinimized }) {
  const { setNotes } = useContext(NoteContext);
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("noteToken");
    navigate("/login");
  }
  return (
    <>
      <nav className={`${style.nav} shadow-sm`}>
        <button
          onClick={() => showModalToAdd({ updater: setNotes })}
          className="btn bg-main text-white text-capitalize w-100 mb-3"
        >
          <i className="fa-solid fa-plus me-2"></i>
          {isMinimized ? "" : "New Note"}
        </button>
        <ul className="list-unstyled">
          <li>
            <NavLink to="/">
              <i className="fa-solid fa-house-user me-2"></i>{" "}
              {isMinimized ? "" : "Home"}
            </NavLink>
          </li>
          <li>
            <NavLink to="/search">
              <i className="fa-solid fa-magnifying-glass me-2"></i>{" "}
              {isMinimized ? "" : "Search"}
            </NavLink>
          </li>
          <li onClick={logout}>
            <span className="pointer">
              <i className="fa-solid fa-arrow-right-from-bracket fa-rotate-180 me-2"></i>{" "}
              {isMinimized ? "" : "Log Out"}
            </span>
          </li>
          <li></li>
        </ul>
        <div
          onClick={() => {
            setIsMinimized(!isMinimized);
          }}
          className={`${style.change} shadow pointer`}
        >
          <i
            className={`fa-solid ${
              isMinimized ? "fa-chevron-right" : "fa-chevron-left"
            } `}
          ></i>
        </div>
      </nav>
    </>
  );
}
