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