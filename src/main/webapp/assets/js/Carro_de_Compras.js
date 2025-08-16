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
	const price = document.querySelector("div#items-price");
	const shipping = document.querySelector("div#ship-price");
	const subtotal = document.querySelector("div#subtotal-price")
	const amountOfProductsTag = document.querySelector("div#items-name");
	let amount = 0;
	let totalPrice = 0;
	let totalShipping = 0;
	
	for(let i=0;i<json.products.length;i++){
		totalPrice += json.products[i].price * json.products[i].quantitySelected
		totalShipping += json.products[i].shipping
		
		let devolution = "No se aceptan devoluciones";
		if(json.products[i].return > 0){
			devolution = "Se aceptan devoluciones"
		}
		let shippingTag = `+ $. ${json.products[i].shipping}`
		if(json.products[i].shipping == 0){
			shippingTag = "Envio gratis"
		}
		const card = document.createElement("div");
		card.classList.add("shopping-cart-product-model")
		card.id = "product-card"
		card.dataset.productCode = json.products[i].productID
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
		                        	<div class="price-product"><strong>$. ${json.products[i].price}</strong></div>
									<div class="price-shipping"><strong id="shipping-price">${shippingTag}</strong></div>
		                        	<div class="devolution-politics"><strong>${devolution}</strong></div>
									<div class="delete-product">Eliminar</div>
		                        </div>
		                  </div>`
						  
		container.appendChild(card);
		
		
		const select = card.querySelector("select.quantity-product-number2");
		for(let j=0;j<json.products[i].quantity;j++){
			const option = document.createElement("option");
			option.innerText = j+1;
			select.appendChild(option);
		}
		
		select.addEventListener("change",()=>{
			const xhr = new XMLHttpRequest();
			xhr.open("POST","QuantityUpdater")
			xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
			xhr.send(`userID=${JSON.parse(localStorage.getItem("userInfo")).codigo}&quantity=${select.value}&productID=${json.products[i].productID}`);
			
			//Actualizar los pagos
			const selects = document.querySelectorAll("select.quantity-product-number2")
			totalPrice = 0
			amount = 0;
			for(let i=0;i<json.products.length;i++){
				totalPrice += json.products[i].price * parseInt(selects[i].options[selects[i].selectedIndex].value)
				amount += parseInt(selects[i].options[selects[i].selectedIndex].value)
			}
			amountOfProductsTag.innerHTML = `<strong>Articulos (${amount})</strong>`
			price.innerHTML = `<strong>L. ${totalPrice}</strong>`
			subtotal.innerHTML = `<strong>L. ${(totalPrice + totalShipping).toFixed(2)}</strong>`
		})
		
		card.addEventListener("click",(e)=>{
			if(e.target.classList.contains("sellers-name")){
				window.location.href = `seller_about_it.html?sellerID=${json.products[i].userID}`
			}else if(e.target.classList.contains("title")){
				window.location.href = `Producto.html?id=${json.products[i].productID}`
			}else if(e.target.classList.contains("delete-product")){
				e.currentTarget.remove();
				//borrar de la base de datos ese registro
				const xhr = new XMLHttpRequest()
				xhr.open("POST","CartDeleter")
				xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
				xhr.send(`userID=${JSON.parse(localStorage.getItem("userInfo")).codigo}&productID=${json.products[i].productID}`);
				//Modificar precios
				const selects = document.querySelectorAll("select.quantity-product-number2")
				totalPrice = 0
				amount = 0;
				totalShipping = 0
				for(let i=0;i<selects.length;i++){
					totalPrice += json.products[i].price * parseInt(selects[i].options[selects[i].selectedIndex].value)
					amount += parseInt(selects[i].options[selects[i].selectedIndex].value)
					const father = selects[i].parentNode.parentNode.parentNode
					const priceTag = father.querySelector("strong#shipping-price").innerText
					if(priceTag == "Envio gratis"){
						totalShipping +=0;
					}else{
					totalShipping = parseFloat(priceTag.substring(5))
					}
				}
				amountOfProductsTag.innerHTML = `<strong>Articulos (${amount})</strong>`
				price.innerHTML = `<strong>$. ${totalPrice}</strong>`
				subtotal.innerHTML = `<strong>$. ${(totalPrice + totalShipping).toFixed(2)}</strong>`
				shipping.innerHTML = `<strong>$. ${totalShipping.toFixed(2)}</strong>`
			}
		})
		
		select.selectedIndex = json.products[i].quantitySelected-1
	}
	
	const selects = document.querySelectorAll("select.quantity-product-number2")
	for(let i=0;i<selects.length;i++){
		amount += parseInt(selects[i].options[selects[i].selectedIndex].value)
	}
	
	price.innerHTML = `<strong>$. ${totalPrice.toFixed(2)}</strong>`
	shipping.innerHTML = `<strong>$. ${totalShipping.toFixed(2)}</strong>`
	amountOfProductsTag.innerHTML = `<strong>Articulos (${amount})</strong>`
	subtotal.innerHTML = `<strong>$. ${(totalPrice + totalShipping).toFixed(2)}</strong>`
	
	
})
xhr.send(`userID=${JSON.parse(localStorage.getItem("userInfo")).codigo}`);