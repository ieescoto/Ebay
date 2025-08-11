const urlParams = new URLSearchParams(window.location.search);
const productID = urlParams.get('id');

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
	document.querySelector("div#price").innerText = `L. ${json.info.price}`;
	document.querySelector("div#product-condition").innerText = `Estado: ${json.info.condition}`;
	document.querySelector("div#quantity-product-number").innerText = `${json.info.quantity}`;
	
	const secondaryImages = document.querySelector("div#other-images-product");
	const primaryImage = document.querySelector("div#active-image-product");
	
	primaryImage.innerHTML = `<img src=${json.images[0]}>`;
	
	for(let i=1;i<json.images.length;i++){
		const images = document.createElement("div");
		images.classList.add("images-container")
		images.innerHTML = `<img src=${json.images[i]}>`
		secondaryImages.appendChild(images);
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

//Boton de favoritos
const favoriteBtn = document.querySelector("button#btn-add-to-favorites-list")
favoriteBtn.addEventListener("click",()=>{
	const xhr = new XMLHttpRequest();
	xhr.open("POST","FavoriteListAdder")
	xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
	xhr.send(`userID=${JSON.parse(localStorage.getItem("userInfo")).codigo}&productID=${productID}`);
})

//Boton de carrito de compras
const cartBtn = document.querySelector("button#btn-add-to-shopping-cart")
cartBtn.addEventListener("click",()=>{
	
})