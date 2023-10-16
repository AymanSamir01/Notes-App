import React, { useContext, useEffect } from "react";
import { NoteContext } from "../../Context/NoteContext";
import { Oval } from "react-loader-spinner";
import style from "./Home.module.css";
import {
  getAllNotes,
  showModalToDelete,
  showModalToUpdate,
} from "../../Utils/Note";
import notFound from "../../Assets/Images/notFoundNotes.png";

export default function Home() {
  const { notes, setNotes } = useContext(NoteContext);

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
        <div className="container">
          <div className="row g-3 my-3">
            {notes.map((note) => {
              return (
                <div className="col-lg-4 col-md-6" key={note._id}>
                  <div className={style.note}>
                    <div className={style.noteBody}>
                      <h5 className="text-main">{note.title}</h5>
                      <p className="lead">{note.content}</p>
                    </div>
                    <div className={style.noteFooter}>
                      <i
                        onClick={() =>
                          showModalToUpdate({
                            prevTitle: note.title,
                            prevContent: note.content,
                            id: note._id,
                            updater: setNotes,
                          })
                        }
                        className="fa-regular fa-pen-to-square pointer"
                      ></i>
                      <i
                        onClick={() =>
                          showModalToDelete({
                            noteId: note._id,
                            token: localStorage.getItem("noteToken"),
                            updater: setNotes,
                          })
                        }
                        className="fa-regular fa-trash-can pointer ms-3"
                      ></i>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
