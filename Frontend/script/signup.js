
document.getElementById("form").addEventListener('submit',signup)

async function  signup(e){
e.preventDefault()
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const age = document.getElementById("age").value

    const userdata = {
        name,
        email,
        password,
        age
    }

    const response = await fetch("http://localhost:8080/user/signup",{
        method : "POST",
        body : JSON.stringify(userdata),
        headers : {
            'content-type' : 'application/json'
        }
    })

    const msg = await response.json()
    console.log(msg)
}