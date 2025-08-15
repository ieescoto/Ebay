//Obtener los productos
const xhr = new XMLHttpRequest()
xhr.open("POST","Bought")
xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
xhr.addEventListener("load",()=>{
	const json = JSON.parse(xhr.responseText);
	const container = document.querySelector("div#product-container")
	for(let i=0;i<json.products.length;i++){
		const card = document.createElement("div")
		card.classList.add("seller-card")
		card.innerHTML = `<div class="seller-left">
		                     <div class="seller-img">
		                         <img src="${json.products[i].url}">
		                      </div>
		                      <div class="seller-info fw-bold">
		                         ${json.products[i].title}
		                     </div>
		                  </div>`
						  
		container.appendChild(card);
		
		card.addEventListener("click",()=>{
			window.location.href = `Producto.html?id=${json.products[i].code}`
		})
	}
})
xhr.send(`userID=${JSON.parse(localStorage.getItem("userInfo")).codigo}`)