import React, { useState } from "react";
import Notes from "../Notes/Notes";

export default function Search() {
  const [filtered, setFiltered] = useState([]);
  const [first, setFirst] = useState(false);
  let mainNotes = JSON.parse(localStorage.getItem("notes"));

  function searchByTitle() {
    let word = document.getElementById("search").value;

    let newArr = mainNotes.filter((note) => {
      return note.title.toLowerCase().includes(word.toLowerCase());
    });

    if (word.length !== 0) {
      setFiltered(newArr);
    } else if (word.length === 0) {
      setFiltered(mainNotes);
    }

    setFirst(true);
  }

  return (
    <>
      <h2 className="h4 heading">
        <i className="fa-solid fa-magnifying-glass me-2"></i>Search
      </h2>
      <input
        onKeyUp={() => searchByTitle()}
        className="form-control mt-5 w-50 mx-auto"
        type="search"
        name="search"
        id="search"
        placeholder="Search By Title ..."
      />
      {filtered.length === 0 && first ? (
        <h5 className="text-center mt-4">No Notes Found For This Title ❎</h5>
      ) : (
        ""
      )}
      <Notes array={filtered} setter={setFiltered} />
    </>
  );
}
