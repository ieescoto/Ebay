//Redireccionar a categorias
const categorie = new Categorie();
const cat = document.querySelectorAll(".cat-pdr");
const container = document.querySelector("div#category-container");

container.addEventListener("click",(event)=>{
	const id = event.target.dataset.codigoCategoria;
	if(id == 19 || id == 15){
		window.location.href = "Productos.html";			
	}else if(id == undefined){
		if(localStorage.getItem("isLogin") == "true"){
			if(event.target.id == "saved"){
				window.location.href = "L_F.html";		
			}else{
				window.location.href = "venta_producto.html";		
			}
		}else{
			window.location.href = "login.html";
		}
		
	}else{
		sessionStorage.setItem("categorieID",id);
		window.location.href = "categorias.html";
	}
})

const circleCategoriesContainer = document.querySelector("div.categories")
circleCategoriesContainer.addEventListener("click",(e)=>{
	const card = e.target
	let id = 0;
	if(card.parentNode.classList.contains("category")){
		const fatherCard = card.parentNode
		id = fatherCard.dataset.categoryId
	}else{
		id = card.dataset.categoryId
	}
		
	if(parseInt(id) < 10){
		sessionStorage.setItem("categorieID",id);
		window.location.href = "categorias.html";
	}else{
		window.location.href = `Lista_Productos.html?search=${id}`
	}
})
