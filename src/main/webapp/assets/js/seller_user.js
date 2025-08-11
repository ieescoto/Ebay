const xhr2 = new XMLHttpRequest();
xhr2.open("POST","SellerUser");
xhr2.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
xhr2.addEventListener("load",()=>{
	const json = JSON.parse(xhr2.responseText);
	
	const container = document.querySelector("div#product-grid");
	for(let i=0;i<json.products.length;i++){
		const card = document.createElement("div")
		card.classList.add("card")
		card.innerHTML = `<img src="${json.products[i].image}" alt="Producto">
						<div class="card-content">
							<div class="title">${json.products[i].title}</div>
							<div class="price">L ${json.products[i].price}</div>
						</div>`
		
		container.appendChild(card);
		
		card.addEventListener("click",()=>{
			window.location.href = `Producto.html?id=${json.products[i].productID}`;
		})
	}
	
});
xhr2.send(`sellerID=${sellerID}`)