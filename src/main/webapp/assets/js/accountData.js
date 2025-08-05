class Account{
	//Recopila los datos del usuario cuando crea una cuenta
	getCreateInfo(){
		const result = []
		const name = document.querySelector("input#name");
		const lastName = document.querySelector("input#last-name");
		const username = document.querySelector("input#username");
		const email = document.querySelector("input#email");
		const password = document.querySelector("input#password");
		const cellphone = document.querySelector("input#cellphone");
		const address = document.querySelector("input#address");
		const country = document.querySelector("select#country");

		const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
		const phoneRegex = /^\+?[\d\s\-().]{7,15}$/;
		const passwordRegex = 	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
		let valid = true;




		result.push(name.value);
		result.push(lastName.value);
		result.push(username.value);
		if(email.value.match(emailRegex)){
			result.push(email.value);
		}else{
			const invalidEmailModal  = document.querySelector("#invalid-email-login");
			const modal = new bootstrap.Modal(invalidEmailModal);
			modal.show();
			valid = false;
		}

		if(password.value.match(passwordRegex)){
			result.push(password.value);
		}else{
			const invalidPasswordModal  = document.querySelector("#invalid-password-login");
			const modal = new bootstrap.Modal(invalidPasswordModal);
			modal.show();
			valid = false;
		}
		result.push(country.selectedIndex+1);
		if(cellphone.value.match(phoneRegex)){
			result.push(cellphone.value);
		}else{
			const invalidPhoneModal  = document.querySelector("#invalid-phone-login");
			const modal = new bootstrap.Modal(invalidPhoneModal);
			modal.show();
			valid = false;
		}
		result.push(address.value.replace(",",";"));


		for(let i = 0; i < result.length; i++) {
			if(result[i] === ""){
				const warningModal = document.querySelector("#empty-credentials-new-account");
				const modal = new bootstrap.Modal(warningModal);
				modal.show();
				valid=false;
				break;
			}
		}
		if(!valid===false){
			this.sendCreateData(result,name,lastName,username,email,password,cellphone,address);
		}else{
			for(let i = 0; i < result.length; i++) {
				result.pop();
			}
		}




	}
	
	//Manda los datos recopilados al servidor para almacenarlos en la BD
	sendCreateData(array,name,lastName,username,email,password,cellphone,address){
		const xhr = new XMLHttpRequest();
		xhr.open("POST","CreateAccount");
		xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
		xhr.send(`values=${JSON.stringify(array)}`);
		xhr.addEventListener("readystatechange",()=>{
			if(xhr.readyState == xhr.DONE && xhr.status == 200){
				const successModal = document.querySelector("#valid-credentials-login");
				const smodal = new bootstrap.Modal(successModal);
				smodal.show();
				
				name.value = "";
				lastName.value = "";
				username.value = "";
				email.value = "";
				password.value = "";
				cellphone.value = "";
				address.value = "";
			}else if(xhr.readyState == xhr.DONE && xhr.status == 401){
				const credentialsAlreadyUsed = document.querySelector("#credentials-in-use")
				const modal = new bootstrap.Modal(credentialsAlreadyUsed);
				modal.show();
			}
		})
	}
	
	//Recpila los datos del usuario que se esta intentando loguear
	getLoginInfo(){
		const result = [];
		const name = document.querySelector("input#name");
		const password = document.querySelector("input#password");

		if(name.value === "" || password.value === ""){
			const warningModal = document.querySelector("#empty-credentials-login");
			const modal = new bootstrap.Modal(warningModal);
			modal.show();
		}else{
			result.push(name.value);
			result.push(password.value);
			
			this.sendLoginData(result);
		}
	}
	
	//Recibe los datos del usuario que se esta logueando
	sendLoginData(array){
		const xhr = new XMLHttpRequest();
		xhr.open("POST","Login");
		xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
		xhr.send(`values=${JSON.stringify(array)}`);
		xhr.addEventListener("readystatechange",() =>{
			if(xhr.readyState == xhr.DONE && xhr.status == 200){
				const json = JSON.parse(xhr.responseText);
				localStorage.setItem("userInfo",JSON.stringify(json));
				localStorage.setItem("isLogin",true);
				localStorage.setItem("countryID",json.codigo_pais-1);
				window.location.href = "index.html";
			}else if(xhr.readyState == xhr.DONE && xhr.status == 401){
				const invalidLogin = document.querySelector("#invalid-login");
				const modal = new bootstrap.Modal(invalidLogin);
				modal.show();
			}
		});
	}
	
	//Actualiza el pais del usuario logueado
	updateCountry(select){
		const xhr = new XMLHttpRequest();
		const user = JSON.parse(localStorage.getItem("userInfo"));
		user.codigo_pais = select.selectedIndex +1;
		user.pais = select.options[select.selectedIndex].value;
		localStorage.setItem("userInfo",JSON.stringify(user));
		xhr.open("POST","CountryUpdater");
		xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
		xhr.send(`countryID=${user.codigo_pais}&userID=${user.codigo}`);
	}
	
	//Crea la interfaz de logueado
	createLoginInterface(json){
		document.querySelector("div#user-login-register").remove();
		
		const container = document.querySelector("div.user-information-container");
		
		const firstName = document.createElement("div");
		const btn = document.createElement("button");
		const menu = document.createElement("div");
		firstName.id = "user-username";
		firstName.innerHTML = `¡Hola<strong>, ${json.nombre}!</strong>`;
		
		btn.id = "btn-show-user-information";
		btn.innerHTML = '<i class="bi bi-chevron-down"></i>';
		
		menu.classList.add("menu-dropdown");
		
		container.appendChild(firstName);
		container.appendChild(btn);
		container.appendChild(menu);
		
		const userContainer = document.createElement("div");
		const userConf = document.createElement("div");
		const logout = document.createElement("div");
		userContainer.classList.add("user-img-name-id-valoration-container");
		
		userConf.classList.add("account-configuration-container");
		userConf.innerHTML = '<a class="user-conf" href="cuenta.html">Configuración de cuenta</a>'
		
		logout.classList.add("close-session-container")
		logout.innerHTML = '<a class="user-conf" href="index.html">Cerrar sesión</a>';
		
		logout.addEventListener("click",() => {
			localStorage.setItem("isLogin",false);
			localStorage.removeItem("userInfo");
			localStorage.removeItem("countryID");
		});
		
		menu.appendChild(userContainer);
		menu.appendChild(userConf);
		menu.appendChild(logout);
		
		
		const profilePic = document.createElement("div")
		const nameContainer = document.createElement("div")
		profilePic.id = "user-img";
		
		nameContainer.classList.add("user-name-id-valoration-container");
		
		userContainer.appendChild(profilePic);
		userContainer.appendChild(nameContainer);
		
		const name = document.createElement("div");
		const username = document.createElement("div");
		name.id = "user-name";
		name.innerHTML = `<strong>${json.nombre} ${json.apellido}</strong>`
		
		username.id = "user-id-valoration";
		username.innerText = `${json.username} (${json.valoracion})`;
		
		nameContainer.appendChild(name);
		nameContainer.appendChild(username);
		
	}
	
	//Envia los datos que se quieren actualizar a la bd
	updateData(data,column){
		const xhr = new XMLHttpRequest();
		const user = JSON.parse(localStorage.getItem("userInfo"));
		xhr.open("POST","Updater");
		xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
		xhr.send(`data=${data.value}&code=1&userID=${user.codigo}&column=${column}`);
		user[column] = data.value;
		localStorage.setItem("userInfo",JSON.stringify(user));
	}
	
	//Envia los datos que se quieren actualizar a la bd
	updatePersonalInfo(name,lastName,address,select){
		const user = JSON.parse(localStorage.getItem("userInfo"));
		const array = []
		array.push(name.value);
		array.push(lastName.value);
		array.push(address.value.replace(",",";"));
		const xhr = new XMLHttpRequest();
		xhr.open("POST","Updater");
		xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
		xhr.send(`data=${array}&code=3&userID=${user.codigo}`);
		user.nombre = name.value
		user.apellido = lastName.value
		user.direccion = address.value
		localStorage.setItem("userInfo",JSON.stringify(user));
		this.updateCountry(select);
	}
	
	//Actualiza la contrasena del usuario
	updatePassword(pass){
		const user = JSON.parse(localStorage.getItem("userInfo"));
		console.log(pass.value);
		const xhr = new XMLHttpRequest();
		xhr.open("POST","Updater");
		xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
		xhr.send(`data=${pass.value}&code=2&userID=${user.codigo}`);
	}
	
	//Envia los datos del producto que se quiere vender
	sendProductData(data){
		const xhr = new XMLHttpRequest()
		xhr.open("POST","ProductSell")
		xhr.send(data);
	}
	
}