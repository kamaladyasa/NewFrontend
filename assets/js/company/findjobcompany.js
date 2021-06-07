document.addEventListener("DOMContentLoaded", function () {

  fetch(`http://127.0.0.1:5000/users/all-job-lists/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      let jobs = '';
      res.forEach(function (post) {
        jobs += `
        <div class="single-job-items mb-30">
          <div class="job-items">
            <div class="company-img">
              <img src="/assets/img/company_logo/${post.company.company_name}.jpeg" style="width: 70px;"></img>
            </div>
            <div class="job-tittle job-tittle2">
              <a href="job_details.html?id=${post.id}">
              <h4>${post.title}</h4>
              </a>
              <ul>
                <li><i class="fas fa-building"></i>${post.company.company_name}</li>
                <li><i class="fas fa-map-marker-alt"></i>${post.location_city}</li>
              </ul>
              <ul>
                <li><i class="fas fa-tags"></i>${post.specialization}</li>
                <li><i class="fas fa-euro-sign"></i>${post.salary}</li>
              </ul>
            </div>
          </div>
          <div class="items-link items-link2 f-right">
            <a href="job.html?id=${post.id}">Read More</a>
            <span>7 hours ago</span>
          </div>
        </div>
        `;
      });
      document.getElementById('jobs').innerHTML = jobs;
    });

  const submitBtn = document.querySelector("#sbmtBtn");
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const srchForm = document.querySelector("#search");
    let regData = new FormData(srchForm);
    let data = Object.fromEntries(regData);

    data = JSON.stringify(data);

    fetch(`http://127.0.0.1:5000/users/filter-job-lists/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((res) => {
        let jobs = '';
        res.forEach(function (post) {
          jobs += `
          <div class="single-job-items mb-30">
          <div class="job-items">
            <div class="company-img">
              <img src="/assets/img/company_logo/${post.company.company_name}.jpeg" style="width: 70px;"></img>
            </div>
            <div class="job-tittle job-tittle2">
              <a href="#">
              <h4>${post.title}</h4>
              </a>
              <ul>
                <li><i class="fas fa-building"></i>${post.company.company_name}</li>
                <li><i class="fas fa-map-marker-alt"></i>${post.location_city}</li>
              </ul>
              <ul>
                <li><i class="fas fa-tags"></i>${post.specialization}</li>
                <li><i class="fas fa-euro-sign"></i>${post.salary}</li>
              </ul>
            </div>
          </div>
          <div class="items-link items-link2 f-right">
            <a href="job.html?id=${post.id}">Read More</a>
            <span>7 hours ago</span>
          </div>
        </div>
        `;
        });
        document.getElementById('jobs').innerHTML = jobs;
      });
  });

  const logout = document.querySelector("#signout");
  logout.addEventListener("click", (e) => {
    e.preventDefault();
    delete localStorage.email;
    window.location.href = "/index.html";
  });

});