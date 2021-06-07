document.addEventListener("DOMContentLoaded", function () {
  let head = {
    "Content-Type": "application/json",
    email: localStorage.email,
  };

  const logout = document.querySelector("#signout");
  logout.addEventListener("click", (e) => {
    e.preventDefault();
    delete localStorage.email;
    window.location.href = "/index.html";
  });

  let params = new URLSearchParams(window.location.search);
  let j = params.get('job_id')
  let u = params.get('user_id')

  fetch(`http://127.0.0.1:5000/companies/detail-job/${j}/`, {
    method: "GET",
    headers: head,
    credentials: "same-origin",
  })
    .then((res) => res.json())
    .then((res) => {

      const date = document.querySelector("#date");
      const title = document.querySelector("#title");
      const specialization = document.querySelector("#specialization");
      const location = document.querySelector("#location");
      const salary = document.querySelector("#salary");
      const desc = document.querySelector("#desc");

      date.innerHTML = res.created_date.split(" ")[1] + " " + res.created_date.split(" ")[2] + " " + res.created_date.split(" ")[3];
      title.innerHTML = res.title;
      specialization.innerHTML = res.specialization;
      location.innerHTML = res.location_city;
      salary.innerHTML = "Rp. " + res.salary.toString().slice(0, 1) + "." + res.salary.toString().slice(-7, -4) + "." + res.salary.toString().slice(-4, -1);
      desc.innerHTML = res.job_description;

    });

  fetch(`http://127.0.0.1:5000/companies/get-users/details/${u}/`, {
    method: "GET",
    headers: head,
    credentials: "same-origin",
  })
    .then((res) => res.json())
    .then((res) => {

      const fullname = document.querySelector("#fullname");
      const gender = document.querySelector("#gender");
      const dob = document.querySelector("#dob");
      const mail = document.querySelector("#mail");
      const contact = document.querySelector("#contact");

      fullname.innerHTML = res.first_name + res.last_name;
      gender.innerHTML = res.gender;
      dob.innerHTML = res.date_of_birth.split(" ")[1]+" "+res.date_of_birth.split(" ")[2]+" "+res.date_of_birth.split(" ")[3];
      mail.innerHTML = res.email;
      contact.innerHTML = res.contact_number;

    });

  fetch(`http://127.0.0.1:5000/companies/get-users/education/${u}/`, {
    method: "GET",
    headers: head,
    credentials: "same-origin",
  })
    .then((res) => res.json())
    .then((data) => {
      let edu = '';
      data.forEach(function (post) {
        edu += `
        <div class="card mb-3" style="width: 100%;">
          <div class="row no-gutters">
            <div class="card-body">
              <h5 class="card-title">${post.level_education}</h5>
              <p>University : ${post.univ_name}</p>
              <p>Major : ${post.major}</p>
              <p>Duration : ${post.start_date.split(" ")[2] + " " + post.start_date.split(" ")[3]} - ${post.complete_date.split(" ")[2] + " " + post.complete_date.split(" ")[3]}</p>
              <p>GPA : ${post.gpa}</p>
            </div>
          </div>
        </div>
        `;
      });
      document.getElementById('edu').innerHTML = edu;
    });

  fetch(`http://127.0.0.1:5000/companies/get-users/experience/${u}/`, {
    method: "GET",
    headers: head,
    credentials: "same-origin",
  })
    .then((res) => res.json())
    .then((data) => {
      let exp = '';
      data.forEach(function (post) {
        exp += `
        <div class="card mb-3" style="width: 100%;">
          <div class="row no-gutters">
            <div class="card-body">
              <h5 class="card-title">${post.job_title}</h5>
              <p>Company Name : ${post.company_name}</p>
              <p>Job Location : ${post.job_location_city}</p>
              <p>Duration : ${post.start_date.split(" ")[2] + " " + post.start_date.split(" ")[3]} - ${post.end_date.split(" ")[2] + " " + post.end_date.split(" ")[3]}</p>
              <p>Job Description : ${post.description_job}</p>
            </div>
          </div>
        </div>
        `;
      });
      document.getElementById('exp').innerHTML = exp;
    });

});