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

  const editemail = document.querySelector('input[name="email"]')
  const editfirstname = document.querySelector('input[name="first_name"]')
  const editlastname = document.querySelector('input[name="last_name"]')
  const editdate = document.querySelector('input[name="date_of_birth"]')
  const editcontact = document.querySelector('input[name="contact_number"]')

  fetch(`http://127.0.0.1:5000/users/profile/`, {
    method: "GET",
    headers: head,
    credentials: "same-origin",
  })
    .then((response) => response.json())
    .then((response) => {
      editemail.value = response.email
      editfirstname.value = response.first_name
      editlastname.value = response.last_name
      editdate.value = response.date_of_birth
      editcontact.value = response.contact_number
    });


  const sbmtBtn = document.querySelector("#btn-submit");
  sbmtBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const editForm = document.querySelector("#formedit");
    let upData = new FormData(editForm);
    let data = Object.fromEntries(upData);

    if (data.email == "") {
      delete data.email;
    }
    if (data.first_name == "") {
      delete data.first_name;
    }
    if (data.last_name == "") {
      delete data.last_name;
    }
    if (data.date_of_birth == "") {
      delete data.date_of_birth;
    }
    if (data.contact_number == "") {
      delete data.contact_number;
    }

    if (Object.entries(data).length === 0) {
      return modal("Blank form, data input not given");
    }

    data = JSON.stringify(data);

    fetch(`http://127.0.0.1:5000/users/`, {
      method: "PUT",
      headers: head,
      body: data,
      credentials: "same-origin",
    })
      .then((response) => response.json())
      .then((response) => {
        return modal("Successfully updated");
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