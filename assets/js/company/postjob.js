document.addEventListener("DOMContentLoaded", function () {

  let head = {
    "Content-Type": "application/json",
    email: localStorage.email,
  };

  const submitBtn = document.querySelector("#postbtn");
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const regForm = document.querySelector("#jobform");
    let regData = new FormData(regForm);
    let data = Object.fromEntries(regData);

    data = JSON.stringify(data);

    fetch(`http://127.0.0.1:5000/companies/post-job/`, {
      method: "POST",
      headers: head,
      body: data,
    })
      .then((response) => response.json())
      .then((response) => {
        return modal("Success posted job");
      });
  });

  const logout = document.querySelector("#signout");
  logout.addEventListener("click", (e) => {
    e.preventDefault();
    delete localStorage.email;
    window.location.href = "/index.html";
  });

});
function modal(text) {
  const modalText = document.querySelector(".modal-body p");
  modalText.innerHTML = text;

  // Jquery
  $("#my-modal").modal("show");
  // Jquery
};