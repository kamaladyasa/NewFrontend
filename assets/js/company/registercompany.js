document.addEventListener("DOMContentLoaded", function () {

  const submitBtn = document.querySelector("#registerbtn");
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const regForm = document.querySelector("#formregister");
    let regData = new FormData(regForm);
    let data = Object.fromEntries(regData);

    data = JSON.stringify(data);

    fetch(`http://127.0.0.1:5000/companies/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((response) => {
        if (response["message"] != "success") {
          return modal(response["message"]);
        } else if (response["message"] == "success") {
          return modal2("Succesfully registered");
        }
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
function modal2(text) {
  const modalText = document.querySelector("#success p");
  modalText.innerHTML = text;

  // Jquery
  $("#successmodal").modal("show");
  // Jquery
};