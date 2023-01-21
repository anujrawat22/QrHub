import navbar from "../reusable/navbar.js"

document.getElementById("nav").innerHTML = navbar()



const html5QrCode = new Html5Qrcode("reader");
html5QrCode.start({ deviceId: { exact: cameraId} }, config, qrCodeSuccessCallback);
