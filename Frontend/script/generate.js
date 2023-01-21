

document.getElementById("generate_qr_url").addEventListener('click',qrforurl)

async function qrforurl(){
    let url = document.getElementById('url').value

    let data = JSON.stringify({
        url
    })

    let response = await fetch("http://localhost:8080/qr/generate",{
        body : data,
        method : "POST",
        headers : {
            'content-type' : 'application/json'
        }
    })


    let imgdata = await response.json()
    console.log(imgdata)
}