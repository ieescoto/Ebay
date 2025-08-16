const btnEdit = document.getElementById('btn-user-description-edit-perfil-container');
const aboutMeFatherContainer = document.querySelector('.user-description-about-me-container');
const divPrincipalButtons = document.querySelector('.user-description-main-container');
const divInformationAboutMe = document.getElementById('user-description-about-me-information');
const profilePicContainer = document.querySelector("div#user-description-img-container");
const image = document.querySelector("img#profile-pic")
let isProfilePic = false;
let userOriginalProfilePic = "";
let defaultDescription = "Espacio donde el Usuario llenara con su Descripcion";


btnEdit.addEventListener('click', () => {
    // Quitar el botón de editar
    btnEdit.remove();

    const btnCancel = document.createElement("button");
    btnCancel.classList.add('btn-user-description-cancel');
    btnCancel.textContent = "Cancelar";

    const btnContinue = document.createElement("button");
    btnContinue.classList.add('btn-user-description-continue');
    btnContinue.textContent = "Continuar";

    divPrincipalButtons.appendChild(btnCancel);
    divPrincipalButtons.appendChild(btnContinue);

    divInformationAboutMe.remove();

    const divAboutMeInstructions = document.createElement("div");
    divAboutMeInstructions.classList.add('user-description-about-me-instructions');
    divAboutMeInstructions.textContent = "Usa este espacio para contarle a otros usuarios de eBay sobre ti y las cosas que te gustan. ¡Dale a los compradores más razones para seguirte!";

    const textAreaAboutMe = document.createElement('textarea');
    textAreaAboutMe.classList.add('user-description-about-me-information-container');
    textAreaAboutMe.placeholder = 'Escribe aqui';
    textAreaAboutMe.name = 'texto_de_descripcion';
    // textAreaAboutMe.textContent = "Tralalero Tralala PorkoAdilo PorkoAla";

    aboutMeFatherContainer.appendChild(divAboutMeInstructions);
    aboutMeFatherContainer.appendChild(textAreaAboutMe);
	
	const editProfilePic = document.createElement("div")
	editProfilePic.classList.add("icon-btn")
	editProfilePic.innerHTML = '<i class="bi bi-pencil">'
	
	profilePicContainer.appendChild(editProfilePic);

    btnCancel.addEventListener('click', () => {
        divPrincipalButtons.appendChild(btnEdit);

        divAboutMeInstructions.remove();
        textAreaAboutMe.remove();

        btnContinue.remove();
        btnCancel.remove();
		
		editProfilePic.remove();
		
		isProfilePic = false;
		image.src = userOriginalProfilePic

        aboutMeFatherContainer.appendChild(divInformationAboutMe);
    });

    btnContinue.addEventListener('click', () => {
		const user = JSON.parse(localStorage.getItem("userInfo"))
		isProfilePic = false
        let textContentTextArea = textAreaAboutMe.value;
		
		editProfilePic.remove()

        divPrincipalButtons.appendChild(btnEdit);

        divAboutMeInstructions.remove();
        textAreaAboutMe.remove();

        btnContinue.remove();
        btnCancel.remove();

		
        if (textContentTextArea.length < 1){
            divInformationAboutMe.textContent = defaultDescription;
            aboutMeFatherContainer.appendChild(divInformationAboutMe);
        }else{
	        divInformationAboutMe.textContent = textContentTextArea;
			aboutMeFatherContainer.appendChild(divInformationAboutMe);
		} 
		
		//Agarrar la url de la foto de perfil
		const profilePicUrl = image.src.replace("http://localhost:8080/Ebay/","").replace("%20"," ").replace("%C3%B1","ñ")
		userOriginalProfilePic = profilePicUrl
		user.foto = profilePicUrl
		localStorage.setItem("userInfo",JSON.stringify(user))
		
		if(textContentTextArea == ""){
			textContentTextArea = defaultDescription
		}
		const profile = document.querySelector("img#profile-foto")
		profile.src = profilePicUrl
				
		//Envio de la informacion al Backend
		const xhr = new XMLHttpRequest()
		xhr.open("POST","Updater")
		xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
		xhr.send(`userID=${JSON.parse(localStorage.getItem("userInfo")).codigo}&data=${textContentTextArea}&code=4&url=${profilePicUrl}`)
    });
	
	editProfilePic.addEventListener("click",()=>{
		if(isProfilePic){
			//Hay foto de perfil
			isProfilePic = false;
			editProfilePic.innerHTML = '<i class="bi bi-pencil">'
			image.src = "assets/img/invitado.jpg"
		}else{
			//No hay foto de perfil
			isProfilePic = true;
			filechooser.click();
			
		}
	})

});
//Evento de cuando se agregua foto de perfil
const filechooser = document.querySelector("input#filechooser")
const formData = new FormData();
filechooser.addEventListener("change",(e)=>{
	const file = e.target.files[0];
	if(file != undefined){
		formData.set("url",file)
		const xhr = new XMLHttpRequest()
		xhr.open("POST","ProductImage")
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xhr.addEventListener("load",()=>{
		const path = JSON.parse(xhr.responseText).imgRoute
		image.src = path
		const editProfilePic = document.querySelector("div.icon-btn")
		editProfilePic.innerHTML = '<i class="bi bi-x">'
		})
		xhr.send(formData)
	}
	filechooser.value = ""
})
//renderizar la descripcion
const usernameTag = document.querySelector("div.user-description-name-container")
const countryTag = document.querySelector("div#user-description-ubication-information")
const dateTag = document.querySelector("div#user-description-creation-date-information")
const xhr = new XMLHttpRequest()
xhr.open("POST","UserDescription")
xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
xhr.addEventListener("load",()=>{
	const json = JSON.parse(xhr.responseText)
	userOriginalProfilePic = json.profilePic
	
	if(json.description != "null"){
		defaultDescription = json.description
		divInformationAboutMe.innerText = json.description
	}
	usernameTag.innerText = json.username
	countryTag.innerText = json.country
	dateTag.innerText = json.creationDate
	image.src = json.profilePic
	
})
xhr.send(`userID=${JSON.parse(localStorage.getItem("userInfo")).codigo}`);