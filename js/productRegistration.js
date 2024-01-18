
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const stockInput = document.getElementById('stock');
const brandInput = document.getElementById('brand');
const categoryInput = document.getElementById('category');
const shortDescInput = document.getElementById('shortDesc');
const longDescInput = document.getElementById('longDesc');
const freeShipInput = document.getElementById('freeShip');
const ageFromInput = document.getElementById('ageFrom');
const ageToInput = document.getElementById('ageTo');
const photoInput = document.getElementById('photo');

//Boolean that determines if the form is valid or not
const isFormValid = [];
let isValid = false;

const validateStg = (stg) => {
    const regExp = new RegExp("^[A-Za-z ]+$");
    return regExp.test(stg);
}

const validateStgLength = (stg, minLength, maxLength) => {
    if (stg.length < minLength) {
        return `El campo debe conterner al menos ${minLength} caracteres`;
    } else if (stg.length > maxLength) {
        return `El campo no debe contener más de ${maxLength} caracteres`;
    } else return true;
}

const checkPositive = num => num >= 0;

const checkInteger = num => Number.isInteger(num);

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

//  Nombre *

nameInput.addEventListener('blur', () => {
    checkAlfabeticValue(nameInput, 3, 30);
    if (isValid) {
        isFormValid[0] = true;
    } else {
        isFormValid[0] = false;
    }
    console.log(isFormValid)
});

//  Marca

brandInput.addEventListener('blur', () => {
    checkAlfabeticValue(brandInput, 3, 30);
    if (isValid) {
        isFormValid[3] = true;
    } else {
        isFormValid[3] = false;
    }
    console.log(isFormValid)
})

//  Categoría *

categoryInput.addEventListener('blur', () => {
    checkAlfabeticValue(categoryInput, 3, 20);
    if (isValid) {
        isFormValid[4] = true;
    } else {
        isFormValid[4] = false;
    }
    console.log(isFormValid)
})

//  Descripción corta *

shortDescInput.addEventListener('blur', () => {
    let validStg = validateStgLength(shortDescInput.value, 15, 60);
    if (validStg === true) {
        hideErrorMessage(shortDescInput);
        isValid = true;
    } else {
        showErrorMessage(shortDescInput, validStg);
        isValid = false;
    }
    if (isValid) {
        isFormValid[5] = true;
    } else {
        isFormValid[5] = false;
    }
    console.log(isFormValid)
})

//  Precio *

priceInput.addEventListener('blur', () => {
    if (!checkPositive(priceInput.value)) {
        showErrorMessage(priceInput, "El valor de este campo debe ser mayor o igual a cero");
        isValid = false;
    } else {
        hideErrorMessage(priceInput);
        isValid = true;
    }
    if (isValid) {
        isFormValid[1] = true;
    } else {
        isFormValid[1] = false;
    }
    console.log(isFormValid)
})

//  Stock *

stockInput.addEventListener('blur', () => {
    if (checkPositive(stockInput.value)) {
        if (checkInteger(Number(stockInput.value))) {
            hideErrorMessage(stockInput);
            isValid = true;
        } else {
            showErrorMessage(stockInput, "El valor de este campor debe ser un número entero");
            isValid = false;
        }
    } else {
        showErrorMessage(stockInput, "El valor de este campo debe ser mayor o igual a 0");
        isValid = false;
    }
    if (isValid) {
        isFormValid[2] = true;
    } else {
        isFormValid[2] = false;
    }
    console.log(isFormValid)
})

//  Edad desde y hasta

function handleAgeInput() {
    const paragraph = document.querySelector('.alta__age p');
    if (ageToInput.value && ageFromInput.value) {
        console.log(typeof ageFromInput.value)
        if (checkInteger(Number(ageFromInput.value)) && checkInteger(Number(ageToInput.value))) {
            if (Number(ageFromInput.value) >= Number(ageToInput.value)) {
                paragraph.style.display = 'block';
                paragraph.innerText = "El límite de edad inferior no puede ser mayor al límite superior";
                isValid = false;
            } else {
                paragraph.style.display = 'none';
                isValid = true;
            }
        } else {
            paragraph.style.display = 'block';
            paragraph.innerText = "Los números ingresados deben ser enteros";
            isValid = false;
        }
    } else if (ageFromInput.value === "" && ageToInput.value === "") {
        paragraph.style.display = 'none';
        isValid = true;
    } else if (ageFromInput.value === "" || ageToInput.value === "") {
        paragraph.style.display = 'block';
        paragraph.innerText = "Debe definir ambos límites de edad";
        isValid = false;
    }
    if (isValid) {
        isFormValid[6] = true;
    } else {
        isFormValid[6] = false;
    }
    console.log(isFormValid)
}

ageFromInput.addEventListener('blur', handleAgeInput);
ageToInput.addEventListener('blur', handleAgeInput);

const toys = [];

function saveToyOnLocalStorage (newToy) {
    const savedToys = localStorage.getItem('toys');
    if (savedToys) {
        let parsedSavedToys = JSON.parse(savedToys);
        parsedSavedToys.push(newToy);
        stringifiedToys = JSON.stringify(parsedSavedToys);
        localStorage.setItem('toys', stringifiedToys);
    } else {
        const firstToy = JSON.stringify([newToy]);
        localStorage.setItem('toys', firstToy);
    }
    alert("El producto se ha guardado correctamente");
}

function onFormSubmit(e) {
    e.preventDefault();
    console.log(isFormValid);
    const form = document.getElementById('uploadForm');
    if (isFormValid.indexOf(false) === -1) {
        const newToy = {
            name:       nameInput.value,
            price:      Number(priceInput.value),
            stock:      Number(stockInput.value),
            brand:      brandInput.value,
            category:   categoryInput.value,
            shortDesc:  shortDescInput.value,
            longDesc:   longDescInput.value,
            freeShip:   freeShipInput.checked,
            ageFrom:    ageFromInput.value === "" ? "" : Number(ageFromInput.value),
            ageTo:      ageToInput.value === "" ? "" : Number(ageToInput.value),
            photo:      photoInput.value
        }
        saveToyOnLocalStorage(newToy);
        form.reset();
    } else {
        alert("El producto no se ha guardado porque hay campos con errores");
    }
}

