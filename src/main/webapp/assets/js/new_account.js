//Poblar los paises
const country = new Country();
country.getCountry(document.querySelector("select.login-input"));
//Enviar los datos
const data = new Account();
const btn = document.querySelector("button.login-btn");
btn.addEventListener("click",data.getCreateInfo.bind(data));
const passwordField = document.querySelector(".password");
const showPasswordBtn = document.querySelector("#showPassword");
showPasswordBtn.addEventListener("mousedown",showPassword.bind(null,passwordField));
showPasswordBtn.addEventListener("mouseup",showPassword.bind(null,passwordField));

function showPassword(inputID) {
    const password = inputID;
    if (password.type === "password") {
        password.type = "text";
    }else{
        password.type = "password";
    }
}