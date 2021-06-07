document.addEventListener("DOMContentLoaded", function () {

  let head = {
    "Content-Type": "application/json",
    email: localStorage.email,
  };

  let params = new URLSearchParams(window.location.search);
  let q = params.get('id')

  const edittitle = document.querySelector('input[name="title"]')
  const editspecialization = document.querySelector('input[name="specialization"]')
  const editlocation = document.querySelector('input[name="location_city"]')
  const editsalary = document.querySelector('input[name="salary"]')
  const editprofil = document.querySelector('textarea[name="job_description"]')

  fetch(`http://127.0.0.1:5000/companies/detail-job/${q}/`, {
    method: "GET",
    headers: head,
    credentials: "same-origin",
  })
    .then((response) => response.json())
    .then((response) => {
      edittitle.value = response.title
      editspecialization.value = response.specialization
      editlocation.value = response.location_city
      editsalary.value = response.salary
      editprofil.value = response.job_description
    });

  const submitBtn = document.querySelector("#updatebtn");
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const regForm = document.querySelector("#editjobform");
    let regData = new FormData(regForm);
    let data = Object.fromEntries(regData);

    if (data.title == "") {
      delete data.title;
    }   
    if (data.specialization == "") {
      delete data.specialization;
    }    
    if (data.location_city == "") {
      delete data.location_city;
    }
    if (data.salary == "") {
      delete data.salary;
    }
    if (data.job_description == "") {
      delete data.job_description;
    }

    data = JSON.stringify(data);

    fetch(`http://127.0.0.1:5000/companies/job-lists/${q}/`, {
      method: "PUT",
      body: data,
      headers: head,
      credentials: "same-origin",
    })
      .then((response) => response.json())
      .then((response) => {
        return modal("Succesfully updated");
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