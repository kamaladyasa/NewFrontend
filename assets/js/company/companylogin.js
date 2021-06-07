document.addEventListener("DOMContentLoaded", function () {

  const editBtn = document.querySelector("#signupbtn");
  editBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "/company/registercompany.html";
  });

  const loginBtn = document.querySelector("#loginbtn");
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const logForm = document.querySelector("#formlogin");
    let logData = new FormData(logForm);
    let data = Object.fromEntries(logData);

    if (data.email == "" || data.password == "") {
      return modal("Blank form, username or password not given");
    }

    let encd = window.btoa(`${data.email}:${data.password}`);
    let auth = `Basic ${encd}`;
    let head = {
      "Content-Type": "application/json",
      Authorization: auth,
    };

    fetch(`http://127.0.0.1:5000/company/login/`, {
      method: "POST",
      headers: head,
      credentials: "same-origin",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response["message"] != "success") {
          return modal(response["error"]);
        }
        localStorage.email = response["email"];
        window.location.href = "/company/indexcompany.html";
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
