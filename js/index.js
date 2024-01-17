//code to populate the slider and the grid

const cardTemplate = document.querySelector('[data-card-template]');
const cardContainer = document.querySelector('[data-card-container]');
const gridContainer = document.querySelector('[data-grid-container]');
const products = [];

class Card {
    constructor (imgSrc, imgAlt, name, shortDescription, price) {
        this.imgSrc = imgSrc;
        this.imgAlt = imgAlt;
        this.name = name;
        this.shortDescription = shortDescription;
        this.price = price;
    }
    populateHtml() {
        const cardElement = cardTemplate.content.cloneNode(true).children[0];
        const img = cardElement.querySelector('[data-img]');
        img.src = `./images/${this.imgSrc}`;
        img.alt = this.imgAlt;
        const name = cardElement.querySelector('[data-name]');
        name.innerHTML = `${this.name}<br><span>Figura Coleccionable</span>`;
        const shortDescription = cardElement.querySelector('[data-description]');
        shortDescription.innerText = this.shortDescription;
        const price = cardElement.querySelector('[data-price]');
        price.innerText = this.price;

        //i need to create another clone of the element, because i can't append the same element to two different containers
        const cardElementForCardContainer = cardElement.cloneNode(true);

        cardContainer.append(cardElementForCardContainer); //clone of the clone
        gridContainer.append(cardElement); //original clone

        products.push(cardElement)
    }
}

const luffyCard = new Card('luffy.jpg', 'Imágen de la figura de Luffy', 'Monkey D. Luffy', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque exercitationem labore libero repellat molestias itaque eos nam officiis esse architecto', '$5990');
luffyCard.populateHtml();

const gokuCard = new Card('goku.jpg', 'Imágen de la figura de Goku', 'Son Goku', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque exercitationem labore libero repellat molestias itaque eos nam officiis esse architecto', '$7500');
gokuCard.populateHtml();

const tanjiroCard = new Card('tanjiro.jpg', 'Imágen de la figura de Tanjiro', 'Tanjiro Kamado', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque exercitationem labore libero repellat molestias itaque eos nam officiis esse architecto', '$7500');
tanjiroCard.populateHtml();

const mikasaCard = new Card('mikasa.jpg', 'Imágen de la figura de Mikasa', 'Mikasa Ackerman', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque exercitationem labore libero repellat molestias itaque eos nam officiis esse architecto', '$8900');
mikasaCard.populateHtml();

//code to control the slider

const slider = document.querySelector('.cards__slider');
slider.style = `width: ${products.length * 100}%`

const leftArrow = document.querySelector('[data-arrow-left]');
const rightArrow = document.querySelector('[data-arrow-right]');

const selectorContainer = document.querySelector('[data-selector-container]');

function createSelectors () {
    for (let i = 0; i < products.length; i++) {
        const newSelector = document.createElement('li');
        if (i === 0) {
            newSelector.setAttribute('selected', 'true');
        }
        selectorContainer.append(newSelector);
    }
}
createSelectors();
console.log(selectorContainer);

const selectors = Array.from(selectorContainer.children);
console.log(selectors)

let cardIndex = 0;

function setIndex () {
    document.querySelector('[selected]').removeAttribute('selected');
    selectors[cardIndex].setAttribute('selected', 'true');
    slider.style.transform = `translate(${cardIndex * (-100 / products.length)}%)`;
}

rightArrow.addEventListener('click', () => {
    if (cardIndex < products.length -1) {
        cardIndex ++;
        setIndex();
    } 
})

leftArrow.addEventListener('click', () => {
    if (cardIndex > 0) {
        cardIndex --;
        setIndex();
    } 
})

selectors.forEach((element, index) => {
    element.addEventListener('click', () => {
        document.querySelector('[selected]').removeAttribute('selected');
        cardIndex = index;
        element.setAttribute('selected', 'true');
        slider.style.transform = `translate(${index * (-100 / products.length)}%)`;
    })
});