document.addEventListener("DOMContentLoaded", function () {
  let head = {
    "Content-Type": "application/json",
    email: localStorage.email,
  };

  fetch(`http://127.0.0.1:5000/companies/profile/`, {
    method: "GET",
    headers: head,
    credentials: "same-origin",
  })
  .then((response) => response.json())
  .then((response) => {
    const email = document.querySelector("#emailcompany");
    const company_name = document.querySelector("#company_name");
    const website = document.querySelector("#website");
    const city =document.querySelector("#city");
    const address =document.querySelector("#address");
    const contact =document.querySelector("#contact");
    const profile =document.querySelector("#profile");


    company_name.innerHTML = response.company_name;
    website.innerHTML = response.website;
    email.innerHTML = response.email;
    city.innerHTML = response.city;
    address.innerHTML = response.address;
    contact.innerHTML = response.contact_number;
    profile.innerHTML = response.profile_description;
  });

  fetch('http://127.0.0.1:5000/companies/job-lists/', {
    method: "GET",
    headers: head,
    credentials: "same-origin",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      let jobpost = '';
      data.forEach(function (post) {
        jobpost += `
        <div class="single-job-items mb-10">
          <div class="job-items">
            <div class="job-tittle job-tittle2">
              <a href="editjob.html?id=${post.id}"><i class="fas fa-edit pb-20 text-dark">edit</i></a>
              <a href="companyjobdetail.html?id=${post.id}"><h4>${post.title}</h4></a>
              <ul>
                <li><i class="fas fa-tags"></i>${post.specialization}</li>
                <li><i class="fas fa-map-marker-alt"></i>${post.location_city}</li>
              </ul>
              <ul>
                <li><i class="fas fa-euro-sign"></i>${post.salary.toString().slice(0, 1) + "." + post.salary.toString().slice(-7, -4) + "." + post.salary.toString().slice(-4, -1)}</li>
                <li><i class="fas fa-calendar-alt"></i> Posted ${post.created_date.split(" ")[1]+" "+post.created_date.split(" ")[2]+" "+post.created_date.split(" ")[3]}</li>
              </ul>
              <p class="text-secondary">Job Description: ${post.job_description}</p>
            </div>
          </div>
        </div>
        `;
      });
      document.getElementById('jobpost').innerHTML = jobpost;
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
    window.location.href = "companyedit.html";
  });

  const postBtn = document.querySelector("#postbtn");
  postBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "postjob.html";
  });

});
