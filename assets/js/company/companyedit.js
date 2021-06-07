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
  const editname = document.querySelector('input[name="company_name"]')
  const editprofil = document.querySelector('textarea[name="profile_description"]')
  const editaddress = document.querySelector('textarea[name="address"]')
  const editcity = document.querySelector('input[name="city"]')
  const editcontact = document.querySelector('input[name="contact_number"]')
  const editwebsite = document.querySelector('input[name="website"]')

  fetch(`http://127.0.0.1:5000/companies/profile/`, {
    method: "GET",
    headers: head,
    credentials: "same-origin",
  })
    .then((response) => response.json())
    .then((response) => {
      editemail.value = response.email
      editname.value = response.company_name
      editprofil.value = response.profile_description
      editaddress.value = response.address
      editcity.value = response.city
      editcontact.value = response.contact_number
      editwebsite.value = response.website
    });

  const sbmtBtn = document.querySelector("#editbtn");
  sbmtBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const editForm = document.querySelector("#formedit");
    let upData = new FormData(editForm);
    let data = Object.fromEntries(upData);

    if (data.email == "") {
      delete data.email;
    }
    if (data.company_name == "") {
      delete data.company_name;
    }
    if (data.profile_description == "") {
      delete data.profile_description;
    }
    if (data.website == "") {
      delete data.website;
    }
    if (data.address == "") {
      delete data.adress;
    }
    if (data.city == "") {
      delete data.city;
    }
    if (data.contact_number == "") {
      delete data.contact_number;
    }

    data = JSON.stringify(data);

    fetch(`http://127.0.0.1:5000/companies/`, {
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