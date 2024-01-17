
let isValid = false;

const validateStg = (stg) => {
    const regExp = new RegExp("^[A-Za-z ]+$");
    return regExp.test(stg);
}

const validateMail = (mail) => {
    const mailRegExp = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
    return mailRegExp.test(mail);
}

const validateStgLength = (stg, minLength, maxLength) => {
    if (stg.length < minLength) {
        return `El campo debe conterner al menos ${minLength} caracteres`;
    } else if (stg.length > maxLength) {
        return `El campo no debe contener más de ${maxLength} caracteres`;
    } else return true;
}
function showErrorMessage(input, message) {
    input.nextElementSibling.style.display = 'block';
    input.nextElementSibling.innerText = message;
    input.setAttribute('aria-invalid', 'true');
}

function hideErrorMessage(input) {
    input.nextElementSibling.style.display = 'none';
    input.removeAttribute('aria-invalid');
}

function checkAlfabeticValue(input, minLength, maxLength) {
    if (validateStg(input.value)) {
        let validStg = validateStgLength(input.value, minLength, maxLength);
        if (validStg === true) {
            hideErrorMessage(input);
            isValid = true;
        } else {
            showErrorMessage(input, validStg);
            isValid = false;
        }
    } else if (input.value === "" && !input.required) {
        hideErrorMessage(input);
        isValid = true;
    } else {
        showErrorMessage(input, "Este campo debe contener únicamente caracteres alfabéticos");
        isValid = false;
    }
}

const userNameInput = document.getElementById('userName');
const userMailInput = document.getElementById('userMail');
const comment = document.getElementById('comment');



//Nombre del usuario

userNameInput.addEventListener('blur', () => {
    checkAlfabeticValue(userNameInput, 5, 40);
})

//Mail del usuario

userMailInput.addEventListener('blur', () => {
    if (validateMail(userMailInput.value)) {
        hideErrorMessage(userMailInput);
        isValid = true;
    } else {
        showErrorMessage(userMailInput, "La dirección de e-mail ingresada no coincide con un formato correcto");
        isValid = false;
    }
})

function saveCommentOnLocalStorage (newComment) {
    const savedComments = localStorage.getItem('comments');
    if (savedComments) {
        let parsedSavedComments = JSON.parse(savedComments);
        parsedSavedComments.push(newComment);
        stringifiedComments = JSON.stringify(parsedSavedComments);
        localStorage.setItem('comments', stringifiedComments);
    } else {
        const firstComment = JSON.stringify([newComment]);
        localStorage.setItem('comments', firstComment);
    }
    alert("El comentario se ha guardado correctamente");
}

function onCommentSubmit (e) {
    e.preventDefault();
    console.log(isValid);
    const form = document.getElementById('commentForm');
    if(isValid) {
        const newComment = {
            userName: userNameInput.value,
            userMail: userMailInput.value,
            comment: comment.value
        }
        saveCommentOnLocalStorage(newComment);
        form.reset();
    } else {
        alert("El comentario no se ha guardado porque hay campos con errores");
    }
}
