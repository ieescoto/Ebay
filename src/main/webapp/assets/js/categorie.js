class Categorie{
	sendData(id){
		const xhr = new XMLHttpRequest();
		xhr.open("POST","Categorie");
		xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
		xhr.addEventListener("readystatechange",this.receiveData.bind(this,xhr));
		xhr.send(`id=${id}`);
	}
	
	receiveData(xhr){
		if(xhr.status == 200 && xhr.readyState == xhr.DONE){
			const response = JSON.parse(xhr.responseText);
			for(let i=0;i<response.categories.length;i++){
				if(response.url[i] == "null"){
					continue;
				}
				this.createCards(i,response);
			}
		}
	}
	
	createCards(i,json){
		const container = document.querySelector("div#categorie-container");
		const card = document.createElement("div");
		//const img = document.createElement("img");
		//const title = document.createElement("a");
		//const cardBody = document.createElement("div");
		//const a = document.createElement("a");
		
		/*<div class="card">
			<img src="assets/img/Cartas.webp" alt="Maquillaje">
			<p>Maquillaje</p>
		</div>*/
		
		card.classList.add("card");
		card.dataset.codigoCategoria = json.id[i];
		card.innerHTML = `<img src="${json.url[i]}" alt="Maquillaje">
						<p>${json.categories[i]}</p>`
		container.appendChild(card);
		
		card.addEventListener("click",()=>{
			window.location.href = `Lista_Productos.html?search=${json.id[i]}`
		})
		
		/*cardBody.classList.add("card-body");
		card.appendChild(cardBody);*/
		
		/*a.href = `Lista_Productos.html?search=${json.id[i]}`;
		cardBody.appendChild(a);*/
		
		//img.classList.add("card-img-top");
		/*img.src = json.url[i];
		card.appendChild(img);
		
		title.href = `Lista_Productos.html?search=${json.id[i]}`;
		title.classList.add("fs-3");
		title.innerText = json.categories[i];
		card.appendChild(title);*/
		
	}
	
	getCategoriesJSON(select){
		const xhr = new XMLHttpRequest()
		xhr.open("POST","assets/resources/category.json")
		xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
		console.log
		xhr.addEventListener("readystatechange",()=>{
			if(xhr.status == 200 && xhr.readyState == xhr.DONE){
				const json = JSON.parse(xhr.responseText)
				for(let i=0;i<json.categories.length;i++){
					const option = document.createElement("option");
					option.dataset.categoryCode = json.categories[i].code
					option.innerText = `${json.categories[i].name}`
					select.appendChild(option)
				}
			}
		})
		xhr.send();
	}
}