//Abrir modal de Enviar
const modal = new Country();
const saveBtn = document.querySelector("button#close-modal");
const modalSelect = document.querySelector("select#countries");
modal.getCountry(modalSelect,saveBtn);

//Actualizar al cambiar pais estando logeado
//Crear la interfaz en el DOM de logueado
const account = new Account();
if(localStorage.getItem("isLogin") == "true"){
	saveBtn.addEventListener("click",account.updateCountry.bind(account,modalSelect));
	account.createLoginInterface(JSON.parse(localStorage.getItem("userInfo")));
}

//Redireccionar a productos al buscar (Prototipo)
const searchbar = document.querySelector("input.searchInput");
const submitBtn = document.querySelector("button.search");

submitBtn.addEventListener("click",()=>{
    window.location.href = `Lista_Productos.html?search=${searchbar.value}`;
})

//Redireccionar a Venta Productos
const sell = document.querySelector("button#sell");
if(localStorage.getItem("isLogin") == "true"){
	sell.addEventListener("click",() =>{
		window.location.href = "venta_producto.html";
	})
}else{
	sell.addEventListener("click",() =>{
		window.location.href = "login.html";
	})
}

//Redireccionar al carrito
const cart = document.querySelector("button#cart");
cart.addEventListener("click",()=>{
	if(localStorage.getItem("isLogin") == "true"){
		window.location.href = "Carro_de_Compras.html";
	}else{
		window.location.href = "login.html";
	}
})

//Redireccionar a Lista de Favoritos
const favorites = document.querySelector("#favorites");
if(localStorage.getItem("isLogin") == "true"){
	favorites.addEventListener("click",()=>{
	window.location.href = "L_F.html";
	})
}else{
	favorites.addEventListener("click",()=>{
	window.location.href = "login.html";
	})
	
}

const profilePic = document.querySelector("div#user-img")
if(localStorage.getItem("isLogin") == "true"){
	const img = document.createElement("img")
	img.src = JSON.parse(localStorage.getItem("userInfo")).foto;
	profilePic.appendChild(img)
}

