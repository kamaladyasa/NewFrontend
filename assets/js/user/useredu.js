document.addEventListener("DOMContentLoaded", function () {

  const logout = document.querySelector("#signout");
  logout.addEventListener("click", (e) => {
    e.preventDefault();
    delete localStorage.email;
    window.location.href = "/index.html";
  });
  
  let head = {
    "Content-Type": "application/json",
    email: localStorage.email,
  };

  const submitBtn = document.querySelector("#addedu");
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const eduForm = document.querySelector("#eduform");
    let regData = new FormData(eduForm);
    let data = Object.fromEntries(regData);

    data = JSON.stringify(data);

    fetch(`http://127.0.0.1:5000/users/education-details/`, {
      method: "POST",
      headers: head,
      body: data,
      credentials: "same-origin",
    })
      .then((response) => response.json())
      .then((response) => {
        return modal("Successfully add education detail")
      });
  });
});
function modal(text) {
  const modalText = document.querySelector(".modal-body p");
  modalText.innerHTML = text;

  // Jquery
  $("#my-modal").modal("show");
  // Jquery
};