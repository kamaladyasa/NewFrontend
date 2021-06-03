document.addEventListener("DOMContentLoaded", function () {

  const loginBtn = document.querySelector("#loginbtn");
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const logForm = document.querySelector("#formlogin");
    let logData = new FormData(logForm);
    let data = Object.fromEntries(logData);

    if (data.email == "" || data.password == "") {
      return alert("Blank form, username or password not given");
    }

    let encd = window.btoa(`${data.email}:${data.password}`);
    let auth = `Basic ${encd}`;
    let head = {
      "Content-Type": "application/json",
      Authorization: auth,
    };

    fetch(`http://127.0.0.1:5000/user/login/`, {
      method: "POST",
      headers: head,
      credentials: "same-origin",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response["email"]) {
          localStorage.email = response["email"];
          window.location.href = "/user/indexuser.html";
        } else {
          return alert(response["error"]);
        }
      });
  });
});
