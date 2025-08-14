//Llenar con los datos
const userID = JSON.parse(localStorage.getItem("userInfo")).codigo
const xhr = new XMLHttpRequest()
xhr.open("POST","SavedSeller")
xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
xhr.addEventListener("load",()=>{
	const json = JSON.parse(xhr.responseText)
	const container = document.querySelector("div#seller-container")
	
	for(let i=0;i<json.sellers.length;i++){
		const card = document.createElement("div")
		card.classList.add("seller-card")
		card.innerHTML = `		<div class="seller-left">
			                        <div class="seller-img">
			                        <img src="${json.sellers[i].image}">
			                        </div>
			                        <div class="seller-info">
			                        <strong>${json.sellers[i].username}</strong>
			                        <a href="seller_user.html?sellerID=${json.sellers[i].sellerID}">Visitar tienda</a>
			                        </div>
			                    </div>
			                    <div class="seller-actions">
			                        <div class="icon-btn" id="delete-saved"><i class="bi bi-heart-fill"></i></div>
			                    </div>`
		
		container.appendChild(card);
		const savedBtn = card.querySelector("div#delete-saved")
		savedBtn.addEventListener("click",(e)=>{
			const selectedCard = e.currentTarget.parentNode.parentNode;
			const xhr = new XMLHttpRequest()
			xhr.open("POST","SaveSellersAdder")
			xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
			xhr.send(`sellerID=${json.sellers[i].sellerID}&userID=${JSON.parse(localStorage.getItem("userInfo")).codigo}&isSaved=true`)
			selectedCard.remove();
		})
	}
})
xhr.send(`userID=${userID}`)
