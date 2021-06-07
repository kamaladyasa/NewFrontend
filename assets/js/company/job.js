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

  fetch(`http://127.0.0.1:5000/users/job-lists/${q}`, {
    method: "GET",
    headers: head,
    credentials: "same-origin",
  })
    .then((res) => res.json())
    .then((res) => {

      const title = document.querySelector("#title");
      const specialization = document.querySelector("#specialization");
      const location = document.querySelector("#location");
      const desc = document.querySelector("#desc");
      const date = document.querySelector("#date");
      const salary = document.querySelector("#salary");
      const loc = document.querySelector("#loc");
      const sal = document.querySelector("#sal");
      const company = document.querySelector("#company");
      const profile = document.querySelector("#profile");
      const comp = document.querySelector("#comp");
      const web = document.querySelector("#web");
      const mail = document.querySelector("#mail");
      const perusahaan = document.querySelector("#perusahaan");
      const logocomp = document.querySelector("#logocomp");

      title.innerHTML = res.title;
      specialization.innerHTML = res.specialization;
      location.innerHTML = res.location_city;
      desc.innerHTML = res.job_description;
      date.innerHTML = res.created_date.split(" ")[1] + " " + res.created_date.split(" ")[2] + " " + res.created_date.split(" ")[3];
      salary.innerHTML = "Rp. " + res.salary.toString().slice(0, 1) + "." + res.salary.toString().slice(-7, -4) + "." + res.salary.toString().slice(-4, -1);
      loc.innerHTML = res.location_city;
      sal.innerHTML = "Rp. " + res.salary.toString().slice(0, 1) + "." + res.salary.toString().slice(-7, -4) + "." + res.salary.toString().slice(-4, -1) + " monthly";
      company.innerHTML = res.company.company_name;
      profile.innerHTML = res.company.profile_description;
      comp.innerHTML = res.company.company_name;
      web.innerHTML = res.company.website;
      mail.innerHTML = res.company.email;
      perusahaan.innerHTML = res.company.company_name;
      logocomp.innerHTML = `<img src="/assets/img/company_logo/${res.company.company_name}.jpeg" style="width:80px;"></img>`;
    });


});