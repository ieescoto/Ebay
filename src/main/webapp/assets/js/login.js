//Enviar los datos
const data = new Account();
const btn = document.querySelector("button.login-btn");
btn.addEventListener("click",data.getLoginInfo.bind(data));

//Boton de mostrar contraseña
const passwordFieldLogin = document.querySelector(".password-login");
const showPasswordBtnLogin = document.querySelector("#showPassword-login");
showPasswordBtnLogin.addEventListener("mousedown",showPassword.bind(null,passwordFieldLogin));
showPasswordBtnLogin.addEventListener("mouseup",showPassword.bind(null,passwordFieldLogin));

function showPassword(inputID) {
    const password = inputID;
    if (password.type === "password") {
        password.type = "text";
    }else{
        password.type = "password";
    }
}
