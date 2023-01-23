function navbar(){

    return `<div id="logo">
    <img src="./Screenshot 2023-01-17 223807.png" alt="">
</div>
<div id="links">
    <ul>
        <li><a href="index.html"><i class="uil uil-process"></i>Generate</a></li>
        <li><a href="scan.html"><i class="uil uil-qrcode-scan"></i></i>Scan</a></li>
        <li><a href="login.html"><i class="uil uil-signin"></i>Login</a></li>
        <li><a href="signup.html"><i class="uil uil-user-plus"></i>Signup</a></li>
        <li id="username"><i class="uil uil-user"></i>Account</li>
    </ul>
</div>`
}

export default  navbar 