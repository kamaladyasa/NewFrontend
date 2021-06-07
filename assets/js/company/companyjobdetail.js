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
  let q = params.get('id')

  fetch(`http://127.0.0.1:5000/companies/detail-job/${q}/`, {
    method: "GET",
    credentials: "same-origin",
  })
    .then((res) => res.json())
    .then((res) => {

      const applicant = document.querySelector("#applicant");
      const date = document.querySelector("#date");
      const title = document.querySelector("#title");
      const specialization = document.querySelector("#specialization");
      const location = document.querySelector("#location");
      const salary = document.querySelector("#salary");
      const desc = document.querySelector("#desc");
      const company = document.querySelector("#company");
      const profile = document.querySelector("#profile");
      const comp = document.querySelector("#comp");
      const web = document.querySelector("#web");
      const mail = document.querySelector("#mail");

      applicant.innerHTML = res.total_applicant;
      date.innerHTML = res.created_date.split(" ")[1] + " " + res.created_date.split(" ")[2] + " " + res.created_date.split(" ")[3];
      title.innerHTML = res.title;
      specialization.innerHTML = res.specialization;
      location.innerHTML = res.location_city;
      salary.innerHTML = "Rp. "+res.salary.toString().slice(0, 1) + "." + res.salary.toString().slice(-7, -4) + "." + res.salary.toString().slice(-4, -1);
      desc.innerHTML = res.job_description;
      company.innerHTML = res.company.company_name;
      profile.innerHTML = res.company.profile_description;
      comp.innerHTML = res.company.company_name;
      web.innerHTML = res.company.website;
      mail.innerHTML = res.company.email;
    });

    fetch(`http://127.0.0.1:5000/companies/job-lists/get-users/${q}/`, {
      method: "GET",
      headers: head,
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        let userapp = '';
        data.forEach(function (post) {
          userapp += `
          <div class="card w-90">
            <div class="card-body">
              <div class="items-link items-link2 f-right">
                <a href="userdetail.html?user_id=${post.user_id}&job_id=${post.job_post_id}">Detail Profile</a>
              </div>
              <a href="userdetail.html?user_id=${post.user_id}&job_id=${post.job_post_id}"><h5 class="card-title">${post.first_name+" "+post.last_name}</h5></a>
              <p class="card-text">Email : ${post.email}</p>
              <p class="card-text">Apply Date : ${post.apply_date.split(" ")[1] + " " + post.apply_date.split(" ")[2] + " " + post.apply_date.split(" ")[3]}</p>
            </div>
          </div>
          `;
        });
        document.getElementById('userapp').innerHTML = userapp;
      });

});