//Redireccionar a Checkout
const btn = document.querySelector("button#btn-complete-transaction");
btn.addEventListener("click",()=>{
	window.location.href = "Checkout.html";
})

//Obtener productos agregados
const xhr = new XMLHttpRequest();
xhr.open("POST","CartProducts")
xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
xhr.addEventListener("load",()=>{
	const json = JSON.parse(xhr.responseText);
	const container = document.querySelector("div#shopping-cart-items")
	let totalPrice = 0;
	let totalShipping = 0;
	
	for(let i=0;i<json.products.length;i++){
		totalPrice += json.products[i].price
		totalShipping += json.products[i].shipping
		
		let devolution = "No se aceptan devoluciones";
		if(json.products[i].return > 0){
			devolution = "Se aceptan devoluciones"
		}
		let shippingTag = `+ L. ${json.products[i].shipping}`
		if(json.products[i].shipping == 0){
			shippingTag = "Envio gratis"
		}
		const card = document.createElement("div");
		card.classList.add("shopping-cart-product-model")
		card.id = "product-card"
		card.innerHTML = `<div class="products-seller">
		                  	<div class="sales-person-img2"><img src="${json.products[i].profilePic}"></div>
		                    <div class="sales-person-name2">
		                    	<div class="sellers-name">${json.products[i].username}</div>
		                        
		                    </div>
		                  </div>
		                  <div class="product-information">
		                  	<div class="product-image"><img src="${json.products[i].image}"></div>
		                    <div class="producto-condition-name">
		                    	<div class="product-information2"><strong class="title">${json.products[i].title}</strong></div>
		                    	<div class="product-condition">Estado: ${json.products[i].condition}</div>
		                    </div>
		                    	<div class="product-information-content2">
		                        	<div class="quantity-product-container">
		                                <h5 class="product-price">Cantidad: </h5>
		                            	<select class="quantity-product-number2"></select>
		                            </div>
		                    	</div>
		                        <div class="price-total-by-product">
		                        	<div class="price-product"><strong>L. ${json.products[i].price}</strong></div>
									<div class="price-shipping"><strong>${shippingTag}</strong></div>
		                        	<div class="devolution-politics"><strong>${devolution}</strong></div>
		                        </div>
		                  </div>`
						  
		container.appendChild(card);
		
		const select = card.querySelector("select.quantity-product-number2");
		for(let j=0;j<json.products[i].quantity;j++){
			const option = document.createElement("option");
			option.innerText = j+1;
			select.appendChild(option);
		}
		
		card.addEventListener("click",(e)=>{
			if(e.target.classList.contains("sellers-name")){
				window.location.href = `seller_about_it.html?sellerID=${json.products[i].userID}`
			}else if(e.target.classList.contains("quantity-product-number2")){
				//Actualizar la BD con el dato puesto
				//Actualizar los pagos
			}else if(e.target.classList.contains("title")){
				window.location.href = `Producto.html?id=${json.products[i].productID}`
			}
		})
	}
	
	const price = document.querySelector("div#items-price");
	const shipping = document.querySelector("div#ship-price");
	const amountOfProductsTag = document.querySelector("div#items-name");
	const amount = document.querySelectorAll("div.shopping-cart-product-model").length
	const subtotal = document.querySelector("div#subtotal-price")
	
	price.innerHTML = `<strong>L. ${totalPrice}</strong>`
	shipping.innerHTML = `<strong>L. ${totalShipping}</strong>`
	amountOfProductsTag.innerHTML = `<strong>Articulos (${amount})</strong>`
	subtotal.innerHTML = `<strong>L. ${totalPrice + totalShipping}</strong>`
	
	
})
xhr.send(`userID=${JSON.parse(localStorage.getItem("userInfo")).codigo}`);