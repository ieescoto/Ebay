//Redireccionar a categorias
const categorie = new Categorie();
const cat = document.querySelectorAll(".cat-pdr");

cat.forEach(categoria => {
    categoria.addEventListener("click",(event)=>{
        const id = event.currentTarget.dataset.codigoCategoria;
		if(id == 19 || id == 15){
	        window.location.href = "Productos.html";			
		}else{
			sessionStorage.setItem("categorieID",id);
	        window.location.href = "categorias.html";
		}
    })
})