document.addEventListener('DOMContentLoaded', function () {
  fetch('http://127.0.0.1:5000/users/job-lists/')
    .then((res) => res.json())
    .then((data) => {
      let joblists = '';
      data.forEach(function (post) {
        joblists += `
          <div class="single-job-items mb-30">
            <div class="job-items">
                <div class="company-img">
                    <a href="job.html?id=${post.id}"><img src="/assets/img/company_logo/${post.company.company_name}.jpeg" style="width: 80px;"></a>
                </div>
                <div class="job-tittle">
                    <a href="job.html?id=${post.id}">
                      <h4>Digital Marketer</h4>
                    </a>
                    <ul>
                        <li><i class="fas fa-building"></i>&nbsp${post.company.company_name}</li>
                        <li><i class="fas fa-map-marker-alt"></i>&nbsp${post.location_city}</li>
                    </ul>
                    <ul>
                      <li><i class="fas fa-tags"></i> ${post.specialization}</li>
                      <li><i class="fas fa-yen-sign"></i> ${post.salary}</li>
                    </ul>
                </div>
            </div>
            <div class="items-link f-right">
                <a href="job.html?id=${post.id}">Read More</a>
                <span>7 hours ago</span>
            </div>
          </div>
        `;
      });
      document.getElementById('joblists').innerHTML = joblists;
    });

  const logout = document.querySelector("#signout");
  logout.addEventListener("click", (e) => {
    e.preventDefault();
    delete localStorage.email;
    window.location.href = "/index.html";
  });
})