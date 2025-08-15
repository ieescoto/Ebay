/*const paypalRadio = document.querySelector("input.paypal")
const creditCardRadio = document.querySelector("input.credit-card")*/
let paymentID = null;

//Nose que hace esto porque no comentan
document.querySelectorAll('.sidebar a').forEach(link => {
   link.addEventListener('click', function (e) {
     e.preventDefault();
     document.querySelectorAll('.col-md-9').forEach(div => div.classList.add('d-none'));

     document.querySelectorAll('.sidebar a').forEach(l => l.classList.remove('active'));

     const targetId = this.getAttribute('data-target');
     const targetDiv = document.getElementById(targetId);
     if (targetDiv) {
       targetDiv.classList.remove('d-none');
       this.classList.add('active');
     } else {
       console.error("No se encontró el div con ID:", targetId);
     }
   });
 });

  document.querySelector('#btn-modal-continue').addEventListener('click', () => {
    const selected = document.querySelector('input[name="paymentOption"]:checked');

    if (!selected) {
      alert('Por favor selecciona una forma de pago.');
      return;
    }

    const selectedValue = selected.value;

    // Cierra cualquier modal abierto antes de abrir uno nuevo
    const modales = ['modal-add-card-DC', 'modal-add-paypal'];
    modales.forEach(id => {
      const modal = bootstrap.Modal.getInstance(document.getElementById(id));
      if (modal) modal.hide();
    });

    // Muestra la modal correspondiente
    if (selectedValue === 'credit_card') {
      const modal = new bootstrap.Modal(document.getElementById('modal-add-card-DC'));
      modal.show();
	  paymentID = 1;
    } else if (selectedValue === 'paypal') {
      const modal = new bootstrap.Modal(document.getElementById('modal-add-paypal'));
      modal.show();
	  paymentID = 2;
    }
  });

 //Llenar los datos con el usuario
 const userData = JSON.parse(localStorage.getItem("userInfo"));
 const username = document.querySelector("div#username");
 const email = document.querySelector("div#email");
 const phoneNumber = document.querySelector("div#phone");
 const personalInfo = document.querySelector("div#personal-info")
 
 username.innerText = `${userData.username}`;
 email.innerText = `${userData.correo_electronico}`;
 phoneNumber.innerText = `${userData.numero_telefono}`;
 personalInfo.innerHTML = `${userData.nombre} ${userData.apellido} <br> ${userData.direccion} <br> ${userData.pais}`;
 
 //Llenar los inputs con informacion predeterminada
 const inptUsername = document.querySelector("input#newUsername");
 const inptEmail = document.querySelector("input#newEmail");
 const inptPhoneNumber = document.querySelector("input#newPhoneNumber")
 const inptName = document.querySelector("input#newName");
 const inptLastName = document.querySelector("input#newLastName");
 const inptAddress = document.querySelector("input#newAddress");
  
 inptUsername.value = `${userData.username}`;
 inptEmail.value = `${userData.correo_electronico}`;
 inptPhoneNumber.value = `${userData.numero_telefono}`;
 inptName.value = `${userData.nombre}`;
 inptLastName.value = `${userData.apellido}`;
 inptAddress.value = `${userData.direccion}`;
 
 //Llenar el select de paises
 const country = new Country()
 const btnSave = document.querySelector("button#save");
 const select = document.querySelector("select#country");
 
 country.getCountry(select,btnSave);
 
 //Actualizar Datos
 const usernameBtn = document.querySelector("button#usernameSave")
 const emailBtn = document.querySelector("button#emailSave")
 const phoneBtn = document.querySelector("button#phoneSave")
 const inptPass = document.querySelector("input#newPassword")
 const passBtn = document.querySelector("button#passSave");
 
 usernameBtn.addEventListener("click",account.updateData.bind(account,inptUsername,inptUsername.dataset.column));
 emailBtn.addEventListener("click",account.updateData.bind(account,inptEmail,inptEmail.dataset.column));
 phoneBtn.addEventListener("click",account.updateData.bind(account,inptPhoneNumber,inptPhoneNumber.dataset.column));
 btnSave.addEventListener("click",account.updatePersonalInfo.bind(account,inptName,inptLastName,inptAddress,select));
 passBtn.addEventListener("click",account.updatePassword.bind(account,inptPass))
 
 //Agregar los metodos de pago a la Bd
 const creditCradBtn = document.querySelector("button#credit-card")
 const paypalBtn = document.querySelector("button#paypal")
 const xhr = new XMLHttpRequest()
 const formData = new FormData();
 formData.set("userID",JSON.parse(localStorage.getItem("userInfo")).codigo)
 xhr.open("POST","Payments")
 creditCradBtn.addEventListener("click",()=>{
	const creditCardNumber = document.querySelector("input#credit-card-number").value
	const expirationDate = document.querySelector("input#expiration-date").value
	const CVV = document.querySelector("input#cvv").value
	const creditCardName = document.querySelector("input#name").value
	const creditCardLastName = document.querySelector("input#last-name").value
	formData.set("creditCardNumber",creditCardNumber)
	formData.set("expirationDate",expirationDate)
	formData.set("CVV",CVV)
	formData.set("creditCardName",creditCardName)
	formData.set("creditCardLastName",creditCardLastName)
	formData.set("method","creditCard")
	xhr.send(formData);
 })
 
 paypalBtn.addEventListener("click",()=>{
	const paypalUser = document.querySelector("input#paypal-user").value
	const paypalEmail = document.querySelector("input#paypal-email").value
	formData.set("paypalUser",paypalUser)
	formData.set("paypalEmail",paypalEmail)
	formData.set("method","paypal")
	xhr.send(formData);
	
 })
 
 //Creacion de tarjetas y Traida de informacion
 const xhr2 = new XMLHttpRequest()
 xhr2.open("POST","PaymentCards")
 xhr2.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
 xhr2.addEventListener("load",()=>{
	const json = JSON.parse(xhr2.responseText)
	const container = document.querySelector("div#cards-container");
	for(let i=0;i<json.payment.length;i++){
		const card = document.createElement("div");
		card.classList.add("payment-card")
		if(json.payment[i].paymentType  == 1){
			card.classList.add("bank")
			card.innerHTML = `	<div class="card-header" data-payment-id="${json.payment[i].paymentID}">
								  <div class="card-type">
								      <img src="bank-icon.svg" alt="Banco">
								      <span>Tarjeta Bancaria</span>
								  </div>
								  <button class="delete-btn">Eliminar</button>
								</div>
								  <div class="card-info">
								    <p class="card-number">•••• •••• •••• ${json.payment[i].creditCardNumber.substring(12)}</p>
								    <p class="expiry">Expira: ${json.payment[i].expirationDate}</p>
								  </div>`
			
		}else if(json.payment[i].paymentType  == 2){
			card.classList.add("paypal")
			card.innerHTML = `<div class="card-header" data-payment-id="${json.payment[i].paymentID}">
							    <div class="card-type">
							      <img src="paypal-icon.svg" alt="PayPal">
							      <span>PayPal</span>
							    </div>
							    <button class="delete-btn">Eliminar</button>
							  </div>
							  <div class="card-info">
							    <p class="paypal-email">${json.payment[i].paypalEmail}</p>
							  </div>`
			
		}
		container.prepend(card)
		
		const deletBtn = card.querySelector("button.delete-btn");
		deletBtn.addEventListener("click",(e)=>{
			const paymentID = e.target.parentNode.dataset.paymentId
			e.target.parentNode.parentNode.remove()
			const xhr = new XMLHttpRequest()
			xhr.open("POST","PaymentDeleter")
			xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
			xhr.send(`paymentID=${paymentID}`)
		})
	}
 })
 xhr2.send(`userID=${JSON.parse(localStorage.getItem("userInfo")).codigo}`);