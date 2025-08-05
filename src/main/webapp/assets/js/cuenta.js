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

  document.querySelector('#btn-modal-continue').addEventListener('click', function () {
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
    } else if (selectedValue === 'paypal') {
      const modal = new bootstrap.Modal(document.getElementById('modal-add-paypal'));
      modal.show();
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
 
 