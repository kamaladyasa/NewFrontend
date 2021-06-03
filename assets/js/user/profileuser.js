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

  // const eduBtn = document.querySelector("#btn-edu");
  // eduBtn.addEventListener("click", (e) => {
  // e.preventDefault();
  // window.location.href = "useredu.html";
  // });

  // const expBtn = document.querySelector("#btn-exp");
  // expBtn.addEventListener("click", (e) => {
  // e.preventDefault();
  // window.location.href = "userexp.html";
  // });

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
                <li><i class="fas fa-trophy"></i>${post.gpa} out of 4.00</li>
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
                <li><i class="fas fa-calendar-alt"></i>30 September 2001</li>
              </ul>
              <ul>
                <li><i class="fas fa-map-marker-alt"></i>Bandung</li>
                <li><i class="fas fa-tags"></i>Statistics</li>
              </ul>
            </div>
          </div>
        </div>
        `;
      });
      document.getElementById('expdetails').innerHTML = expdetails;
    })

});
