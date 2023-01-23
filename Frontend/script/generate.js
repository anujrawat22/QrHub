import navbar from "../reusable/navbar.js"

document.getElementById("nav").innerHTML = navbar()

document.getElementById("generate_qr_url").addEventListener('click',qrforurl)

let base64Data;
let cookie =  document.cookie.split("=")
   let token = cookie[1].split(";")[0]
   let refreshtoken = cookie[2]


async function qrforurl(){
    let url = document.getElementById('url').value

    let data = ({
        "url" : url
    })

   

    let response = await fetch("http://localhost:8080/qr/generate",{
        body : JSON.stringify({"data" : data}),
        method : "POST",
        headers : { 
            'Content-type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })


    let actualdata =  await response.json()
    
    document.getElementById("generatedimage").src = actualdata.data
    base64Data = actualdata.data
    console.log(actualdata)

}


document.getElementById("downloadbtn").addEventListener("click",downloadimg)





function downloadimg(){
    if(base64Data){
        var a = document.createElement("a"); //Create <a>
        a.href = "data:image/png;base64," + base64Data; //Image Base64 Goes here
        a.download = "Image.png"; //File name Here
        a.click(); //Downloaded file window.location.href = 'data:application/octet-stream;base64,' + base64Data;
    }
    

}



const fileinput = document.getElementById('fileinput')

fileinput.addEventListener('change',async e =>{
    const file = fileinput.files[0]
    console.log(file)
    const reader = new FileReader();

    reader.addEventListener('load',()=>{
        console.log(reader.result)
    })

    const imgdata = reader.readAsDataURL(file)
    
    let data = {
        'imgbase64' : imgdata
    }

    const response = await fetch ("http://localhost:8080/qr/generate",{
        method : "POST",
        body : JSON.stringify({
            'data' : data
        }),
        headers : { 
            'Content-type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })

    let actualdata =  await response.json()
    
    document.getElementById("generatedimage").src = actualdata.data
    base64Data = actualdata.data
    
})


// document.getElementById("logout").addEventListener('click',logout)

// async function logout(){

// console.log("hello")
//     let response = await fetch("http://localhost:8080/user/logout",{
//         method : "POST",
        
//         headers : { 
//                 'Content-type' : 'application/json',
//                 'Authorization' : `Bearer ${token}`
//             }
        
//     })

//     let data = await response.json()
//     console.log(data)
// }