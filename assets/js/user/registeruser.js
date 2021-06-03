document.addEventListener("DOMContentLoaded", function () {

  const submitBtn = document.querySelector("#registerbtn");
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const regForm = document.querySelector("#formregister");
    let regData = new FormData(regForm);
    let data = Object.fromEntries(regData);

    data = JSON.stringify(data);

    fetch(`http://127.0.0.1:5000/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((response) => {
      alert("Successfully registered");
      window.location.href = "userlogin.html";
      });
  });
});