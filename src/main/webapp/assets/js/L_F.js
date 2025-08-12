const userInfo = JSON.parse(localStorage.getItem("userInfo"))
const xhr = new XMLHttpRequest();
xhr.open("POST","FavoriteList")
xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
xhr.addEventListener("load",()=>{
	const json = JSON.parse(xhr.responseText)
	
	const container = document.querySelector("div#favorites-list-container");
	for(let i=0;i<json.products.length;i++){
		const card = document.createElement("div");
		card.classList.add("favorites-list-molde")
		card.innerHTML = `<div class="favorites-list-img"><img src="${json.products[i].image}"></div>
		                  <div class="favorites-list-information">
		                  	<div class="favorites-list-product-name">${json.products[i].title}</div>
		                  	<div class="favorites-list-product-condition">Estado: ${json.products[i].condition}</div>
		                  	<div class="favorites-list-product-price">L. ${json.products[i].price}</div>
		                  	<div class="favorites-list-seller-valoration-container">
		                    	<div class="favorites-list-seller">${json.products[i].username}</div>
		                    </div>
		                  </div>
		                  <div class="favorites-list-options">
		                  	
		                    <button class="btn-list-favorites" id="btn-more-seller-products">Ver otros articulos del vendedor</button>
		                    
		                  </div>`
		container.appendChild(card);
		
		card.addEventListener("click",(e)=>{
			if(e.target.id == "btn-more-seller-products"){
				window.location.href = `seller_user.html?sellerID=${json.products[i].userID}`
			}else{
				window.location.href = `Producto.html?id=${json.products[i].productID}`
			}
		})
	}
	
	
})
xhr.send(`userID=${userInfo.codigo}`);