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
  setCookie ('token',data.token)
  setCookie ('token',data.refreshtoken)

  console.log(document.cookie.token)
//   if(data.msg==="Logged in sucessfully"){
//     window.open("./generate.html")
//   }
  
}
