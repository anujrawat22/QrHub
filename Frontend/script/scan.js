import navbar from "../reusable/navbar.js"
document.getElementById("nav").innerHTML = navbar()


const scanner = new Html5QrcodeScanner('reader', { 
    // Scanner will be initialized in DOM inside element with id of 'reader'
    qrbox: {
        width: 200,
        height: 200,
    },  // Sets dimensions of scanning box (set relative to reader element width)
    fps: 20, // Frames per second to attempt a scan
});


scanner.render(success, error);
// Starts scanner

function success(result) {
    document.getElementById('result').style.visibility = "visible"
    document.getElementById('btn').style.display = "block"
    document.getElementById('result').innerHTML = `
    <h2>Visit</h2>
    <p><a id="a" href="${result}">${result}</a></p>
    `;
    // Prints result as a link inside result element

    scanner.clear();
    // Clears scanning instance

    // document.getElementById('reader').remove();
    // // Removes reader element from DOM since no longer needed

}

function error(err) {
    console.error(err);
    // Prints any errors to the console
}


document.getElementById("btn").addEventListener('click',reload)

function reload(){
    window.location.reload()
}