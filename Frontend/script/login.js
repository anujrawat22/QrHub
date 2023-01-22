import navbar from "../reusable/navbar.js"

document.getElementById("nav").innerHTML = navbar()

document.getElementById("form").addEventListener("submit", login);

async function login(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const userdata = JSON.stringify({
    "email" : email,
    "password" : password,
  });
  
  console.log(userdata)

  const response = await fetch("http://localhost:8080/user/login", {
    method: "POST",
    body: userdata,
    headers: {
      "content-type": "application/json",
    }
  });

  const data = await response.json();
  console.log(data)
  

  console.log(document.cookie)

  
  if(data.token){
    document.getElementById("username").innerHTML = `<i class="uil uil-user"></i>${data.username.split(" ")[0]}`
   window.location.href = "generate.html"
  }
  
}
