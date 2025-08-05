class Country{
	constructor(){
		this.select;
	}
	getCountry(select,btn){
		const xhr = new XMLHttpRequest();
		this.select = select;
		xhr.open("GET","assets/resources/countries.json")
		xhr.addEventListener("load",this.setCountry.bind(this,xhr,btn));
		xhr.send();
	}
	
	setCountry(xhr,btn){
		const json = JSON.parse(xhr.responseText);
		for(let i=0;i<json.countries.length;i++){
			const option = document.createElement("option");
			option.innerHTML = json.countries[i].es_name;
			this.select.appendChild(option);
		}
		btn.addEventListener("click",()=>{
			localStorage.setItem("countryID",this.select.selectedIndex);
		});
		this.updateCountry();
	}
	
	updateCountry(){
		if(localStorage.getItem("countryID") != null){
			this.select.selectedIndex = parseInt(localStorage.getItem("countryID"));
		}
	}
}