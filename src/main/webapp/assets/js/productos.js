const urlParams = new URLSearchParams(window.location.search);
const productID = urlParams.get('id');
let isFavorited = false;
let isInCart = false;

//Llenar pagina con info correspondiente
const xhr = new XMLHttpRequest()
xhr.open("POST","Product")
xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
xhr.addEventListener("load",()=>{
	const json = JSON.parse(xhr.responseText);
	const seller = document.querySelector("div#seller");
	document.querySelector("div#title").innerText = `${json.info.title}`;
	seller.innerText = `${json.info.username}`;
	document.querySelector("div#rating").innerText = `${json.info.rating}% de Comentarios Positivos`;
	document.querySelector("div#price").innerText = `$. ${json.info.price}`;
	document.querySelector("div#product-condition").innerText = `Estado: ${json.info.condition}`;
	document.querySelector("div#quantity-product-number").innerText = `${json.info.quantity}`;
	document.querySelector("div#sales-person-img").innerHTML = `<img src=${json.info.profilePic} class="object-fit-cover">`
	
	const secondaryImages = document.querySelector("div#other-images-product");
	const primaryImage = document.querySelector("div#active-image-product");
	
	primaryImage.innerHTML = `<img id="main-image" src=${json.images[0]}>`;
	
	for(let i=1;i<json.images.length;i++){
		const images = document.createElement("div");
		images.classList.add("images-container")
		images.innerHTML = `<img class="secondary-image" src=${json.images[i]}>`
		secondaryImages.appendChild(images);
	}
	
	//replace("http://localhost:8080/Ebay/","").replace("%20"," ").replace("%C3%B1","ñ")
	const mainImage = document.querySelector("img#main-image");
	const imagesSecondary = document.querySelectorAll("img.secondary-image")
	for(let i=0;i<imagesSecondary.length;i++){
		imagesSecondary[i].addEventListener("click",()=>{
			let temp = imagesSecondary[i].src.replace("http://localhost:8080/Ebay/","").replace("%20"," ").replace("%C3%B1","ñ")
			imagesSecondary[i].src = mainImage.src.replace("http://localhost:8080/Ebay/","").replace("%20"," ").replace("%C3%B1","ñ")
			mainImage.src = temp;
		})
	}
	
	
	document.querySelector("div#id-item").innerText = productID;
	document.querySelector("div#item-char-condition-value").innerText = `${json.info.condition}`;
	document.querySelector("div#item-char-model-value").innerText = `${json.info.model}`;
	document.querySelector("div#item-char-brand-value").innerText = `${json.info.brand}`;
	document.querySelector("div#item-char-category-value").innerText = `${json.info.category}`;
	
	const characteristicsContainer = document.querySelector("div#item-characteristics-container2");
	for(let i=0;i<json.characteristics.length;i++){
		const container = document.createElement("div");
		container.classList.add("item-char-container-molde")
		container.innerHTML = `<div class="item-char-name">${json.characteristics[i].characteristic}</div>
				     			<div class="item-char-value">${json.characteristics[i].value}</div>`;
		characteristicsContainer.appendChild(container);
	}
	
	seller.addEventListener("click",()=>{
		window.location.href = `seller_about_it.html?sellerID=${json.info.sellerCode}`
	})
})
xhr.send(`productID=${productID}`);

//Revisar si esta en favoritos
const xhr2 = new XMLHttpRequest();
xhr2.open("POST","FavoriteChecker")
xhr2.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
xhr2.addEventListener("load",()=>{
	const json = JSON.parse(xhr2.responseText);
	if(json.isFavorited == 1){
		isFavorited = true;
		const icon = document.querySelector("i#heart-icon");
		icon.classList.remove("bi-suit-heart")
		icon.classList.add("bi-suit-heart-fill")
		icon.style.color = "red";
	}
})

//Revisar si esta en el carrito
const xhr3 = new XMLHttpRequest()
xhr3.open("POST","CartChecker")
xhr3.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
xhr3.addEventListener("load",()=>{
	const json = JSON.parse(xhr3.responseText);
	if(json.isInCart == 1){
		isInCart = true;
		const cartBtn = document.querySelector("button#btn-add-to-shopping-cart");
		cartBtn.innerText = "Ver en la cesta";
	}
})

if(localStorage.getItem("isLogin") == "true"){
	xhr2.send(`userID=${JSON.parse(localStorage.getItem("userInfo")).codigo}&productID=${productID}`);
	xhr3.send(`userID=${JSON.parse(localStorage.getItem("userInfo")).codigo}&productID=${productID}`);
}


//Boton de favoritos
const favoriteBtn = document.querySelector("button#btn-add-to-favorites-list")
favoriteBtn.addEventListener("click",()=>{
	if(localStorage.getItem("isLogin") == "true"){
		const xhr = new XMLHttpRequest();
		xhr.open("POST","FavoriteListAdder")
		xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
		xhr.send(`userID=${JSON.parse(localStorage.getItem("userInfo")).codigo}&productID=${productID}&isFavorited=${isFavorited}`);
		const icon = document.querySelector("i#heart-icon");
		if(isFavorited){
			isFavorited = false;
			icon.classList.remove("bi-suit-heart-fill")
			icon.classList.add("bi-suit-heart")
			icon.style.color = "#0968F6";
			
		}else{
			isFavorited = true;
			icon.classList.remove("bi-suit-heart")
			icon.classList.add("bi-suit-heart-fill")
			icon.style.color = "red";
		}
	}else{
		window.location.href = "login.html"
	}
})

//Boton de carrito de compras
const cartBtn = document.querySelector("button#btn-add-to-shopping-cart")
cartBtn.addEventListener("click",()=>{
	if(localStorage.getItem("isLogin") == "true"){
		if(isInCart){
			window.location.href = "Carro_de_Compras.html";
		}else{
			isInCart = true;
			const xhr = new XMLHttpRequest();
			xhr.open("POST","Cart")
			xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
			xhr.send(`userID=${JSON.parse(localStorage.getItem("userInfo")).codigo}&productID=${productID}`);
			const cartBtn = document.querySelector("button#btn-add-to-shopping-cart");
			cartBtn.innerText = "Ver en la cesta";
		}
	}else{
		window.location.href = "login.html"
	}
})
