//Abrir modal de Enviar
const modal = new ModalCountries();
modal.fillSelect();
document.querySelector("p#location").addEventListener("click",modal.modalOpener.bind(modal));