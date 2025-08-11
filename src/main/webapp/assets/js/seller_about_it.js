const xhr2 = new XMLHttpRequest();
xhr2.open("POST","SellerAboutIt");
xhr2.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
xhr2.addEventListener("load",()=>{
	const json = JSON.parse(xhr2.responseText);
	
	document.querySelector("div#about-shop").innerHTML = json.description
	document.querySelector("p#seller-country").innerHTML = `<strong>Ubicación:</strong> ${json.country}`
	document.querySelector("p#seller-date").innerHTML = `<strong>Usuario desde:</strong> ${json.date}`
	document.querySelector("p#seller-username").innerHTML = `<strong>Vendedor:</strong> ${json.username}`
	
});
xhr2.send(`sellerID=${sellerID}`)