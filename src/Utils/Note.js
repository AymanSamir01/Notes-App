import axios from "axios";
import Swal from "sweetalert2";

// AddToNote
// 1- showModalToAdd
export function showModalToAdd({ updater }) {
  Swal.fire({
    title: "Add Note 💙",
    html: `
   <div class="p-2">
   <input type="text" name="title" id="title" placeholder="Enter Title" class="form-control" />
   <textarea type="text" name="content" id="content" placeholder="Enter Description" style="min-height: 160px; resize: none" class="form-control mt-3" ></textarea>
   </div>
    `,
    showCancelButton: true,
    confirmButtonText: "Add",
    showLoaderOnConfirm: true,
    confirmButtonColor: "#22668D",
    cancelButtonColor: "#899296de",
    preConfirm: (login) => {
      const title = document.getElementById("title").value;
      const content = document.getElementById("content").value;
      if (title !== "" && content !== "") {
        return { title, content };
      } else {
        return;
      }
    },
  }).then(async (result) => {
    await sendDataToAddNote({
      title: result?.value?.title,
      content: result?.value?.content,
      token: localStorage.getItem("noteToken"),
      updater,
    });
  });
}
// 2- sendDataToAddNote
async function sendDataToAddNote({ title, content, token, updater }) {
  try {
    if (title.length !== 0 && content.length !== 0) {
      let { data } = await axios.post(
        `https://note-sigma-black.vercel.app/api/v1/notes`,
        { title, content },
        { headers: { token } }
      );

      if (data?.msg === "done") {
        getAllNotes({ token, updater });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your note has been updated",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    }
  } catch (error) {
    // console.log(error);
  }
}
// 3- getAllNotes
export async function getAllNotes({ token, updater }) {
  try {
    const { data } = await axios.get(
      `https://note-sigma-black.vercel.app/api/v1/notes`,
      { headers: { token } }
    );
    updater(data?.notes);
  } catch (error) {
    updater([]);
  }
}

// Delete Note From Notes
// 1- showModalToDelete
export function showModalToDelete({ noteId, token, updater }) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#22668D",
    cancelButtonColor: "#899296de",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      DeleteFromNote({ noteId, token, updater });
    }
  });
}
// 2- DeleteFromNotes
async function DeleteFromNote({ noteId, token, updater }) {
  const { data } = await axios.delete(
    `https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,
    { headers: { token } }
  );
  getAllNotes({ token, updater });
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Your note has been deleted",
    showConfirmButton: false,
    timer: 1000,
  });
}

// update note
// 1- showModalToUpdate
export function showModalToUpdate({ prevTitle, prevContent, id, updater }) {
  Swal.fire({
    title: "Update Note 💙",
    html: `
   <div class="p-2">
   <input  type="text" name="title" id="title" placeholder="Enter Title" class="form-control" value="${prevTitle}"/>
   <textarea  type="text" name="content" id="content" placeholder="Enter Description" style="min-height: 160px; resize: none" class="form-control mt-3" >${prevContent}</textarea>
   </div>
    `,
    showCancelButton: true,
    confirmButtonText: "Update",
    showLoaderOnConfirm: true,
    confirmButtonColor: "#22668D",
    cancelButtonColor: "#899296de",
    preConfirm: (login) => {
      const title = document.getElementById("title").value;
      const content = document.getElementById("content").value;
      return { title, content };
    },
  }).then((result) => {
    sendUpdatedDataToApi({
      id,
      updater,
      title: result?.value?.title,
      content: result?.value?.content,
      token: localStorage.getItem("noteToken"),
    });
  });
}

// 2- sendUpdatedDataToApi
async function sendUpdatedDataToApi({ id, title, content, token, updater }) {
  const { data } = await axios.put(
    `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
    { title, content },
    { headers: { token } }
  );

  if (title !== data?.title || content !== data?.content) {
    getAllNotes({ token, updater });

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your note has been updated",
      showConfirmButton: false,
      timer: 1000,
    });
  }
}
// show password
export function togglePasswordVisibility() {
  const passwordInput = document.getElementById("password-input");
  const eyeIcon = document.querySelector(".eyeIcon");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
  } else {
    passwordInput.type = "password";
    eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
  }
}

// Read More & Read Less
export function readMore(index) {
  var dots = document.querySelectorAll(".dots");
  var moreText = document.querySelectorAll(".more");
  var btnText = document.querySelectorAll(".myBtn");

  if (dots[index].style.display === "none") {
    dots[index].style.display = "inline";
    btnText[index].innerHTML = "Read more ...";
    moreText[index].classList.add("d-none");
  } else {
    dots[index].style.display = "none";
    btnText[index].innerHTML = "Read less";
    moreText[index].classList.replace("d-none", "d-inline");
  }
}
