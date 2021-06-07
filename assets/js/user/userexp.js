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

  const submitBtn = document.querySelector("#addexp");
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const expForm = document.querySelector("#expform");
    let regData = new FormData(expForm);
    let data = Object.fromEntries(regData);

    data = JSON.stringify(data);

    fetch(`http://127.0.0.1:5000/users/experience-details/`, {
      method: "POST",
      headers: head,
      body: data,
      credentials: "same-origin",
    })
      .then((response) => response.json())
      .then((response) => {
        return modal("Successfully add experience detail");
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
