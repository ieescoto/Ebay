//Boton de checkout
const checkoutBtn = document.querySelector("button#btn-complete-final-transaction")


//rellenar la info de los productos
const xhr = new XMLHttpRequest();
xhr.open("POST","CartProducts")
xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
xhr.addEventListener("load",()=>{
	const json = JSON.parse(xhr.responseText);
	const formData = new FormData()
	
	
	
	const container = document.querySelector("div#review-order")
	const price = document.querySelector("div#complete-transaction-payment-items-price");
	const shipping = document.querySelector("div#complete-transaction-payment-ship-price");
	const subtotal = document.querySelector("div#complete-transaction-payment-total-price")
	const amountOfProductsTag = document.querySelector("div#complete-transaction-payment-items-name");
	let amount = 0;
	let totalPrice = 0;
	let totalShipping = 0;
	
	for(let i=0;i<json.products.length;i++){
		formData.append("products",json.products[i].productID)
		formData.append("sellerID",json.products[i].userID)
		
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
			price.innerHTML = `<strong>$. ${totalPrice}</strong>`
			subtotal.innerHTML = `<strong>$. ${(totalPrice + totalShipping).toFixed(2)}</strong>`
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
	
	checkoutBtn.addEventListener("click",()=>{
		//Guardar en historial de compras
		const selects = document.querySelectorAll("select.quantity-product-number2")
		for(let i=0;i<selects.length;i++){
			formData.append("quantityBought",parseInt(selects[i].options[selects[i].selectedIndex].value))
			formData.append("subtotal",(json.products[i].price * parseInt(selects[i].options[selects[i].selectedIndex].value))+json.products[i].shipping);
			formData.append("totalQuantity",json.products[i].quantity)
		}
		formData.append("buyerID",JSON.parse(localStorage.getItem("userInfo")).codigo);
		
		const shopHistory = new XMLHttpRequest()
		shopHistory.open("POST","BoughtHistory")
		shopHistory.send(formData);
		//Borrar el carrito
		const cartDeleter = new XMLHttpRequest()
		cartDeleter.open("POST","DeleteAllCart")
		cartDeleter.send(formData)
		
		//Reducir cantidad de producto
		const quantityReducer = new XMLHttpRequest();
		quantityReducer.open("POST","QuantityReducer")
		quantityReducer.send(formData)
		
		//Aumentar lo de productos comprados del vendedor
		
	})
	
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


//Rellenar la info de la direccion
const user = JSON.parse(localStorage.getItem("userInfo"))
document.querySelector("div#name-information").innerText = user.nombre+" "+user.apellido
document.querySelector("div#name-direction").innerText = user.direccion
document.querySelector("div#name-country").innerText = user.pais
document.querySelector("div#phone-number").innerText = user.numero_telefono

//Rellenar formas de pago
const xhr2 = new XMLHttpRequest()
xhr2.open("POST","PaymentCards")
xhr2.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
xhr2.addEventListener("load",()=>{
	const json = JSON.parse(xhr2.responseText)
	const container = document.querySelector("div#pay-with")
	const checkoutTag = document.querySelector("h2#checkout-tag")
	for(let i=0;i<json.payment.length;i++){
		const card = document.createElement("div");
		card.classList.add("card-container")
		if(json.payment[i].paymentType == 1){
			//Es tarjeta
			card.innerHTML = `<button class="btn-card"><i class="bi bi-circle"></i></button>
						      <div class="card-img-name">
						          <div class="card-img"><img src="assets/img/Visa.svg" title="Credit Card" height="30"> x-${json.payment[i].creditCardNumber.substring(12)}</div>
						          <div class="card-name"></div>
						      </div>`
							  		
			container.appendChild(card)
			const radioBtn = card.querySelector("button.btn-card")
		
			radioBtn.addEventListener("click",()=>{
				const allRadioBtn = document.querySelectorAll("button.btn-card");
				for(let i=0;i<allRadioBtn.length;i++){
					allRadioBtn[i].innerHTML = '<i class="bi bi-circle"></i>';
				}
				radioBtn.innerHTML = '<i class="bi bi-circle-fill"></i>'
				checkoutTag.innerText = "Confirmar y pagar"
			
			})
		}
		
		
	}
	
	const paypalRadio = document.querySelector("button#paypal-radio")
	paypalRadio.addEventListener("click",()=>{
		const allRadioBtn = document.querySelectorAll("button.btn-card");
		for(let i=0;i<allRadioBtn.length;i++){
			allRadioBtn[i].innerHTML = '<i class="bi bi-circle"></i>';
		}
		paypalRadio.innerHTML = '<i class="bi bi-circle-fill"></i>'
		checkoutTag.innerText = "Pagar con PayPal"
	})
})
xhr2.send(`userID=${JSON.parse(localStorage.getItem("userInfo")).codigo}`);