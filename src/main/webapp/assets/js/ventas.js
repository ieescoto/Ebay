const userCode = JSON.parse(localStorage.getItem("userInfo")).codigo
const xhr = new XMLHttpRequest();
xhr.open("POST","UserProducts")
xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
xhr.addEventListener("load",()=>{
	const json = JSON.parse(xhr.responseText);
/*	<div class="seller-card">
	   <div class="seller-left">
	       <div class="seller-img">
	           <img src="assets/img/Cartas.webp">
	       </div>
	       <div class="seller-info">
	           <strong>Cafetera</strong>
	       </div>
	   </div>
	 </div>*/
	const container = document.querySelector("div#product-container");
	for(let i=0;i<json.products.length;i++){
		const card = document.createElement("div");
		card.classList.add("seller-card")
		card.dataset.codigoProducto = json.products[i].code;
		card.innerHTML = `<div class="seller-left"><div class="seller-img"><img src=${json.products[i].url}></div><div class="seller-info"><strong>${json.products[i].title}<strong></div></div>`;
		container.appendChild(card);
		
		card.addEventListener("click",(e)=>{
			window.location.href = `Producto.html?id=${json.products[i].code}`
		})
	}
})
xhr.send(`code=${userCode}`);