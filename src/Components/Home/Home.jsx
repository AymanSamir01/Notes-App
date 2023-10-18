import React, { useContext, useEffect } from "react";
import { NoteContext } from "../../Context/NoteContext";
import { Oval } from "react-loader-spinner";
import { getAllNotes } from "../../Utils/Note";
import notFound from "../../Assets/Images/notFoundNotes.png";
import Notes from "../Notes/Notes";

export default function Home() {
  const { notes, setNotes } = useContext(NoteContext);
  localStorage.setItem("notes", JSON.stringify(notes));

  useEffect(() => {
    getAllNotes({
      token: localStorage.getItem("noteToken"),
      updater: setNotes,
    });
  }, []);

  return (
    <>
      <h2 className="h4 heading">
        <i className="fa-regular fa-folder me-2"></i>My Notes
      </h2>
      {notes === null ? (
        <div className="d-flex  min-vh-100 align-items-center justify-content-center">
          <Oval
            height={60}
            width={60}
            color="#eee"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#22668D"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      ) : notes.length === 0 ? (
        <div className="row align-items-center justify-content-center">
          <div className="col-md-10 col-lg-8 mt-5">
            <img src={notFound} className="w-100" alt="not found notes" />
          </div>
        </div>
      ) : (
        <Notes array={notes} setter={setNotes} />
      )}
    </>
  );
}
