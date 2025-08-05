// Script para seleccionar los select de ENVIO
document.addEventListener('DOMContentLoaded', function () {
    const selector = document.getElementById('selector2');
    
    const secciones = {
        estandar: document.getElementById('diseño-estandar'),
        mercancia: document.getElementById('diseño-mercancia')
    };

    function mostrarSeccionSeleccionada() {
        const valor = selector.value;
        for (const clave in secciones) {
            if (clave === valor) {
                secciones[clave].style.display = 'block';
            } else {
                secciones[clave].style.display = 'none';
            }
        }
    }

    mostrarSeccionSeleccionada();
    selector.addEventListener('change', mostrarSeccionSeleccionada);
});

// Script para seleccionar los select de ENVIOS NACIONALES
document.addEventListener("DOMContentLoaded", function () {
    const selectorTarifa = document.getElementById("selector-tarifa");
    const fija = document.getElementById("diseño-fija");
    const calculada = document.getElementById("diseño-calculada");

    selectorTarifa.addEventListener("change", function () {
        if (selectorTarifa.value === "fija") {
        fija.style.display = "block";
        calculada.style.display = "none";
        } else if (selectorTarifa.value === "calculada") {
        fija.style.display = "none";
        calculada.style.display = "block";
        }
    });

    
    selectorTarifa.dispatchEvent(new Event("change"));
});

// Script cuando seleccionamos el checkbox de envio gratis se deshabilite el comprador paga
const checkboxFija = document.getElementById('envioGratisFija');
const precioInput = document.getElementById('precio');
checkboxFija.addEventListener('change', function() {
    precioInput.disabled = this.checked;
});

// Script cuando seleccionamos el checkbox de envio gratis se cambie a Tu pagas
const checkboxCalculada = document.getElementById('envioGratisCalculada');
const labelPago = document.getElementById('labelPago');
checkboxCalculada.addEventListener('change', function() {
    if (this.checked) {
        labelPago.innerHTML = "<strong>Tú pagas:</strong>";
    } else {
        labelPago.innerHTML = "<strong>El comprador paga:</strong>";
    }
});

// Script cuando seleccionamos el checkbox de devoluciones y permita el acceso al select
const toggle = document.getElementById('toggleDevolucion');
const selectPlazo = document.getElementById('plazo');
toggle.addEventListener('change', function () {
    selectPlazo.disabled = !this.checked;
});

const btnAddCharacteristic = document.getElementById('add-category');
const btnEliminateCharacterstic = document.getElementById('eliminate-category');
const fatherContainerChar = document.getElementById("characteristic-container");
let contador = 0;

btnAddCharacteristic.addEventListener("click", () => {
    const moldeContainerChar = document.createElement("div");
    moldeContainerChar.classList.add("new-additional-characteristic-molde");
    moldeContainerChar.id = `molde-${contador}`;
    
    const characteristicsContainerName = document.createElement("div");
    const characteristicsContainerValue = document.createElement("div");
    
    characteristicsContainerName.classList.add("new-additional-characteristic-name");
    characteristicsContainerValue.classList.add("new-additional-characteristic-value");
    
    const inputNameContainer = document.createElement("input");
    inputNameContainer.classList.add("form-control", "input-custom", "login-input");
    inputNameContainer.placeholder = "Nombre de la Caracteristica";
    inputNameContainer.type = "text";

    const inputValueContainer = document.createElement("input");
    inputValueContainer.classList.add("form-control", "input-custom", "login-input");
    inputValueContainer.placeholder = "Valor de la Caracteristica";
    inputValueContainer.type = "text";
    
    characteristicsContainerName.appendChild(inputNameContainer);
    characteristicsContainerValue.appendChild(inputValueContainer);
    
    moldeContainerChar.appendChild(characteristicsContainerName);
    moldeContainerChar.appendChild(characteristicsContainerValue);
    fatherContainerChar.appendChild(moldeContainerChar);
});

btnEliminateCharacterstic.addEventListener("click", () => {
  const moldes = fatherContainerChar.querySelectorAll(".new-additional-characteristic-molde");
  if (moldes.length > 0) {
    const ultimoMolde = moldes[moldes.length - 1];
    fatherContainerChar.removeChild(ultimoMolde);
  }
});

//Llenar select de categorias
const category = new Categorie();
const categorySelect = document.querySelector("select#categories");
category.getCategoriesJSON(categorySelect);

//Abrir filechooser
const imageBtn = document.querySelector("button#load-image");
const filechooser = document.querySelector("input#filechooser");
imageBtn.addEventListener("click",()=>{
	filechooser.click();
})

//Mandar los datos de la imagen a la bd
const account = new Account()
filechooser.addEventListener("change",(e)=>{
	const file = e.target.files[0];
	//formData.append("url",file);
	//account.sendProductData(formData);
})

//Mandar los datos del producto a la bd
const sellBtn = document.querySelector("button#sell")
sellBtn.addEventListener("click",()=>{
	const formData = new FormData()
	//Valores de la tabla de productos
	const title = document.querySelector("input#title").value;  //Usado
	const categoryCode = categorySelect.selectedOptions[0].dataset.categoryCode; //Usado
	const brand = document.querySelector("input#brand").value; //Usado
	const model = document.querySelector("input#model").value; //Usado
	const conditionCode = Number.parseInt(document.querySelector("select#condition").selectedOptions[0].dataset.conditionCode); //Usado
	const description = document.querySelector("textarea#description").value; //Usado
	const productPrice = document.querySelector("input#productPrice").value; //Usado
	const quantity = Number.parseInt(document.querySelector("input#quantity").value); //Usado
	const returnCheckbox = document.querySelector("input#toggleDevolucion") //Usado
	const shippingMethod = document.querySelector("select#selector2").selectedOptions[0].dataset.method; //Usado
	
	let returnCode = 1;
	if(returnCheckbox.checked){
		returnCode = Number.parseInt(document.querySelector("select#plazo").selectedOptions[0].dataset.returnCode);
	}
	
	
	let shippingPrice = Number.parseFloat(document.querySelector("input#precio").value)
	let shippingCheckbox = document.querySelector("input#envioGratisFija") //Usado 
	if(shippingMethod === "standard"){
		const costType = document.querySelector("select#selector-tarifa").selectedOptions[0].dataset.costType;
		if(costType === "calculated"){
			shippingCheckbox = document.querySelector("input#envioGratisCalculada");
			const weightLbs = Number.parseFloat(document.querySelector("input#SweightLbs").value);
			const weightOz = Number.parseFloat(document.querySelector("input#SweightOz").value);
			const Sheight = Number.parseFloat(document.querySelector("input#Sheight").value)
			const Swidth = Number.parseFloat(document.querySelector("input#Swidth").value)
			const Slength = Number.parseFloat(document.querySelector("input#Slength").value)
			
			//Calcular
			const realWeight = Number.parseFloat(Number.parseFloat(weightLbs + (weightOz/16)).toFixed(2));
			const dimensionalWeight = Number.parseFloat(Number.parseFloat((Slength * Swidth * Sheight)/166).toFixed(2));
			let basePrice = dimensionalWeight;
			if(realWeight > dimensionalWeight){
				basePrice = realWeight
			}
			shippingPrice = basePrice * 2;
			
		}
	}else{
		const Fweight = Number.parseFloat(document.querySelector("input#Fweight").value)
		const Fheight = Number.parseFloat(document.querySelector("input#Fheight").value)
		const Fwidth = Number.parseFloat(document.querySelector("input#Fwidth").value)
		const Flength = Number.parseFloat(document.querySelector("input#Flength").value)
		
		const dimensionalWeight = Number.parseFloat(Number.parseFloat((Flength * Fwidth * Fheight)/166).toFixed(2));
		
		let basePrice = dimensionalWeight;
		if(Fweight > dimensionalWeight){
			basePrice = Fweight
		}
		shippingPrice = basePrice * 2;
		
	}
	
	if(shippingCheckbox.checked){
		shippingPrice = 0.0;
	}	
	
	//Caracteristicas
	const caracteristics = document.querySelectorAll("div#molde-0");
	
	if(caracteristics.length > 0){
		for(let i =0;i<caracteristics.length;i++){
			const caracteristicInpt = caracteristics[i].querySelectorAll("input");
			formData.append("carName",caracteristicInpt[0].value)
			formData.append("carValue",caracteristicInpt[1].value)
		}
	}
	
	
	//Orden de la BD
	formData.append("categoryCode",categoryCode) //Funciona
	formData.append("seller",JSON.parse(localStorage.getItem("userInfo")).codigo); //Funciona
	formData.append("title",title) //Funciona
	formData.append("description",description) //Funciona
	formData.append("price",productPrice) //Funciona
	formData.append("conditionCode",conditionCode) //Funciona
	formData.append("shippingPrice",shippingPrice) //Funciona
	formData.append("returnCode",returnCode) //Funciona
	formData.append("quantity",quantity) //Funciona
	formData.append("brand",brand)	//Funciona
	formData.append("model",model) //Funciona
	
	console.log(formData.getAll("carName"));
	console.log(formData.getAll("carValue"));
	account.sendProductData(formData);
	
})



