const btnEdit = document.getElementById('btn-user-description-edit-perfil-container');
const aboutMeFatherContainer = document.querySelector('.user-description-about-me-container');
const divPrincipalButtons = document.querySelector('.user-description-main-container');
const divInformationAboutMe = document.getElementById('user-description-about-me-information');


btnEdit.addEventListener('click', () => {
    // Quitar el botón de editar
    btnEdit.remove();

    const btnCancel = document.createElement("button");
    btnCancel.classList.add('btn-user-description-cancel');
    btnCancel.textContent = "Cancelar";

    const btnContinue = document.createElement("button");
    btnContinue.classList.add('btn-user-description-continue');
    btnContinue.textContent = "Continuar";

    divPrincipalButtons.appendChild(btnCancel);
    divPrincipalButtons.appendChild(btnContinue);

    divInformationAboutMe.remove();

    const divAboutMeInstructions = document.createElement("div");
    divAboutMeInstructions.classList.add('user-description-about-me-instructions');
    divAboutMeInstructions.textContent = "Usa este espacio para contarle a otros usuarios de eBay sobre ti y las cosas que te gustan. ¡Dale a los compradores más razones para seguirte!";

    const textAreaAboutMe = document.createElement('textarea');
    textAreaAboutMe.classList.add('user-description-about-me-information-container');
    textAreaAboutMe.placeholder = 'Escribe aqui';
    textAreaAboutMe.name = 'texto_de_descripcion';
    // textAreaAboutMe.textContent = "Tralalero Tralala PorkoAdilo PorkoAla";

    aboutMeFatherContainer.appendChild(divAboutMeInstructions);
    aboutMeFatherContainer.appendChild(textAreaAboutMe);

    btnCancel.addEventListener('click', () => {
        divPrincipalButtons.appendChild(btnEdit);

        divAboutMeInstructions.remove();
        textAreaAboutMe.remove();

        btnContinue.remove();
        btnCancel.remove();

        aboutMeFatherContainer.appendChild(divInformationAboutMe);
    });

    btnContinue.addEventListener('click', () => {
        const textContentTextArea = textAreaAboutMe.value;

        divPrincipalButtons.appendChild(btnEdit);

        divAboutMeInstructions.remove();
        textAreaAboutMe.remove();

        btnContinue.remove();
        btnCancel.remove();

        if (textContentTextArea.length < 1){
            divInformationAboutMe.textContent = "Espacio donde el Usuario llenara con su Descripcion";
            aboutMeFatherContainer.appendChild(divInformationAboutMe);
            return;
        } 

        divInformationAboutMe.textContent = textContentTextArea;
        aboutMeFatherContainer.appendChild(divInformationAboutMe);
    });

});
