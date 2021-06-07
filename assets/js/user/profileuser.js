document.addEventListener("DOMContentLoaded", function () {
  let head = {
    "Content-Type": "application/json",
    email: localStorage.email,
  };

  fetch(`http://127.0.0.1:5000/users/profile/`, {
    method: "GET",
    headers: head,
    credentials: "same-origin",
  })
    .then((response) => response.json())
    .then((response) => {
      const email = document.querySelector("#email");
      const fullname = document.querySelector("#fullname");
      const date = document.querySelector("#date");
      const gender = document.querySelector("#gender");
      const contact = document.querySelector("#contact");


      fullname.innerHTML = `${response.first_name} ${response.last_name}`;
      email.innerHTML = response.email;
      gender.innerHTML = response.gender;
      contact.innerHTML = response.contact_number;
      date.innerHTML = response.date_of_birth.split(" ")[1] + " " + response.date_of_birth.split(" ")[2] + " " + response.date_of_birth.split(" ")[3];
    });

  const logout = document.querySelector("#signout");
  logout.addEventListener("click", (e) => {
    e.preventDefault();
    delete localStorage.email;
    window.location.href = "/index.html";
  });

  const editBtn = document.querySelector("#editBtn");
  editBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "useredit.html";
  });

  const eduBtn = document.querySelector("#edubtn");
  eduBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "useredu.html";
  });

  const expBtn = document.querySelector("#expbtn");
  expBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "userexp.html";
  });

  fetch('http://127.0.0.1:5000/users/education-details/', {
    method: "GET",
    headers: head,
    credentials: "same-origin",
  })
    .then((res) => res.json())
    .then((data) => {
      let edudetails = '';
      data.forEach(function (post) {
        edudetails += `
        <div class="single-job-items mb-10">
          <div class="job-items">
            <div class="job-tittle job-tittle2">
              <h4>${post.level_education}</h4>
              <ul>
                <li><i class="fas fa-tags"></i>${post.major}</li>
                <li><i class="fas fa-building"></i>${post.univ_name}</li>
              </ul>
              <ul>
                <li><i class="fas fa-calendar-alt"></i>${post.start_date.split(" ")[2]+" "+post.start_date.split(" ")[3]} - ${post.complete_date.split(" ")[2]+" "+post.complete_date.split(" ")[3]}</li>
                <li><i class="fas fa-trophy"></i>${post.gpa} out of GPA</li>
              </ul>
            </div>
          </div>
        </div>
        `;
      });
      document.getElementById('edudetails').innerHTML = edudetails;
    });

  fetch('http://127.0.0.1:5000/users/experience-details/', {
    method: "GET",
    headers: head,
    credentials: "same-origin",
  })
    .then((res) => res.json())
    .then((data) => {
      let expdetails = '';
      data.forEach(function (post) {
        expdetails += `
        <div class="single-job-items mb-10">
          <div class="job-items">
            <div class="job-tittle job-tittle2">
              <h4>${post.job_title}</h4>
              <ul>
                <li><i class="fas fa-building"></i>${post.company_name}</li>
                <li><i class="fas fa-map-marker-alt"></i>${post.job_location_city}</li>
              </ul>
              <ul>
                <li><i class="fas fa-calendar-alt"></i>${post.start_date.split(" ")[2]+" "+post.start_date.split(" ")[3]} - ${post.end_date.split(" ")[2]+" "+post.end_date.split(" ")[3]}</li>
              </ul>
              <ul>
                <li>Job Description : &nbsp ${post.description_job}</li>
              <u/>
            </div>
          </div>
        </div>
        `;
      });
      document.getElementById('expdetails').innerHTML = expdetails;
    })

    fetch('http://127.0.0.1:5000/users/apply-job/', {
    method: "GET",
    headers: head,
    credentials: "same-origin",
  })
    .then((res) => res.json())
    .then((data) => {
      let appliedjob = '';
      data.forEach(function (post) {
        appliedjob += `
        <div class="single-job-items mb-10">
          <div class="job-items">
            <div class="job-tittle job-tittle2">
              <a href="job_details.html?id=${post.job_post_id}"><h4>${post.title}</h4></a>
              <ul>
                <li><i class="fas fa-building"></i>${post.company}</li>
                <li><i class="fas fa-map-marker-alt"></i>${post.location_city}</li>
              </ul>
              <ul>
                <li><i class="fas fa-calendar-alt"></i>Apply Date ${post.apply_date.split(" ")[1]+" "+post.apply_date.split(" ")[2]+" "+post.apply_date.split(" ")[3]}</li>
                <li><i class="fas fa-euro-sign"></i>${post.salary.toString().slice(0, 1) + "." + post.salary.toString().slice(-7, -4) + "." + post.salary.toString().slice(-4, -1)}</li>
              </ul>
            </div>
          </div>
        </div>
        `;
      });
      document.getElementById('appliedjob').innerHTML = appliedjob;
    })

});
