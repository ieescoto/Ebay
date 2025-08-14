let isSaved = false;

//Enviar el parametro entre paginas
const urlParams = new URLSearchParams(window.location.search);
const sellerID = urlParams.get('sellerID');

const sellerProducts = document.querySelector("a#user-products")
sellerProducts.href = `seller_user.html?sellerID=${sellerID}`;

const sellerAboutIt = document.querySelector("a#about-it")
sellerAboutIt.href = `seller_about_it.html?sellerID=${sellerID}`

const sellerComments = document.querySelector("a#comments")
sellerComments.href = `seller_coment.html?sellerID=${sellerID}`

//Llenar los datos
const xhr = new XMLHttpRequest();
xhr.open("POST","SellerHeader");
xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
xhr.addEventListener("load",()=>{
	const json = JSON.parse(xhr.responseText);
	
	document.querySelector("img#profilePic").src = json.profilePic
	document.querySelector("h1#seller-name").innerText = json.username
	document.querySelector("span#followers").innerText = `${json.followers} seguidores`
	
});
xhr.send(`sellerID=${sellerID}`)

//Revisar si esta en vendedores guardados
const xhr3 = new XMLHttpRequest();
xhr3.open("POST","CheckSavedSellers")
xhr3.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
xhr3.addEventListener("load",()=>{
	const json = JSON.parse(xhr3.responseText);
	if(json.isSaved == 1){
		isSaved = true;
		const icon = document.querySelector("i#heart-icon");
		icon.classList.remove("bi-suit-heart")
		icon.classList.add("bi-suit-heart-fill")
		icon.style.color = "red";
	}
})

if(localStorage.getItem("isLogin") == "true"){
	xhr3.send(`sellerID=${sellerID}&userID=${JSON.parse(localStorage.getItem("userInfo")).codigo}`)
}

//Vendedores Guardados
const saveSellerBtn = document.querySelector("button#seller-saver")
saveSellerBtn.addEventListener("click",()=>{
	const xhr = new XMLHttpRequest();
	xhr.open("POST","SaveSellersAdder")
	xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
	if(localStorage.getItem("isLogin") == "true"){
		xhr.send(`sellerID=${sellerID}&userID=${JSON.parse(localStorage.getItem("userInfo")).codigo}&isSaved=${isSaved}`)
		const icon = document.querySelector("i#heart-icon");
		if(isSaved){
			isSaved = false;
			icon.classList.remove("bi-suit-heart-fill")
			icon.classList.add("bi-suit-heart")
			icon.style.color = "#0968F6";		
		}else{
			isSaved = true;
			icon.classList.remove("bi-suit-heart")
			icon.classList.add("bi-suit-heart-fill")
			icon.style.color = "red";
		}
	}else{
		window.location.href = "login.html";
	}
})