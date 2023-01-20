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

  const msg = await response.json();
  console.log(msg);
}
