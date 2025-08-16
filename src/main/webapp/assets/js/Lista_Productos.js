const urlParams = new URLSearchParams(window.location.search);
const searchValue = urlParams.get('search');
let isCategorie = false;

if(isNaN(parseInt(searchValue))){
	isCategorie = false;
}else{
	isCategorie = true;
}

const xhr = new XMLHttpRequest();
xhr.open("POST","Searcher")
xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
xhr.addEventListener("load",()=>{
	const json = JSON.parse(xhr.responseText);
	const container = document.querySelector("div#card-container");
	
	for(let i=0;i<json.products.length;i++){
		const card = document.createElement("div")
		card.classList.add("container-products-by-individual");
		card.id = "product-card";
		card.innerHTML = `<div class="container-imagen-product"><img src="${json.products[i].image}"></div>
			              <div class="container-product-information">
			                 <div class="container-product-name-condition">
			                     <div class="container-product-name"><h3>${json.products[i].title}</h3></div>
			                     <div class="container-product-condition"><h5>Estado: ${json.products[i].condition} </h5></div>
			                 </div>
			                 <div class="container-product-more-information-product">
			                     <div class="container-product-price-seller-positive-comentaries">
			                         <div class="container-product-price"><h1>$. ${json.products[i].price}</h1></div>
			                     </div>
			                     <div class="container-product-price-ship" id="shipping">$. ${json.products[i].shipping} por el envio</div>
			                 </div>
			              </div>`;
		container.appendChild(card);
		if(json.products[i].shipping == 0.0){
			document.querySelector("div#shipping").innerText = "Envio Gratis"
		}
	}
	
	const cards = document.querySelectorAll("div#product-card");
	for(let i=0;i<cards.length;i++){
		cards[i].addEventListener("click",()=>{
			window.location.href = `Producto.html?id=${json.products[i].code}`;
		})
	}
	
	
	
})



xhr.send(`isCategorie=${isCategorie}&search=${searchValue}`);