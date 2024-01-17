const navBtn = document.querySelector('[data-nav-bars]');
const mobileNav = document.querySelector('.mobile-nav');
const closeNavBtn = document.querySelector('[data-closeNav-btn]');
const headerTitle = document.querySelector('.header__store');
const headerLogo = document.querySelector('.header__logo');
const headerLine = document.querySelector('.header__line');


navBtn.addEventListener('click', () => {
    mobileNav.style.display = 'flex'
    document.body.style.overflowY = 'hidden';
    headerTitle.classList.remove('slideInRight');
    headerLine.classList.remove('opacityIncrease');
    headerLogo.classList.remove('opacityIncrease');
})

closeNavBtn.addEventListener('click', () => {
    mobileNav.style.display = 'none';
    document.body.style.overflowY = 'auto';
    headerTitle.classList.add('slideInRight');
    headerLine.classList.add('opacityIncrease');
    headerLogo.classList.add('opacityIncrease');
})
