import React from "react";
import style from "./Notes.module.css";
import {
  showModalToDelete,
  showModalToUpdate,
  readMore,
} from "../../Utils/Note";

export default function Notes({ array, setter }) {
  return (
    <>
      <div className="container">
        <div className="row g-3 my-3">
          {array.map((note, index) => {
            return (
              <div className="col-lg-4 col-md-6" key={note._id}>
                <div className={style.note}>
                  <div className={style.noteBody}>
                    <h5 className="text-main">{note.title}</h5>
                    <p className="lead">
                      {note.content.split("").slice(0, 36).join("")}
                      <span className="dots">
                        {note.content.length >= 36 ? "..." : ""}
                      </span>
                      <span className="more d-none">
                        {note.content.split("").slice(36).join("")}
                      </span>
                    </p>
                  </div>
                  <div className={style.noteFooter}>
                    <div>
                      <i
                        onClick={() =>
                          showModalToUpdate({
                            prevTitle: note.title,
                            prevContent: note.content,
                            id: note._id,
                            updater: setter,
                          })
                        }
                        className="fa-regular fa-pen-to-square pointer"
                      ></i>
                      <i
                        onClick={() =>
                          showModalToDelete({
                            noteId: note._id,
                            token: localStorage.getItem("noteToken"),
                            updater: setter,
                          })
                        }
                        className="fa-regular fa-trash-can pointer ms-3"
                      ></i>
                    </div>
                    <div>
                      <span
                        className="myBtn text-end d-block text-primary pointer"
                        onClick={() => readMore(index)}
                      >
                        {note.content.length >= 36 ? "  Read more ..." : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
