const URL = 'https://api.change24pro.com/';

const logos = document.querySelectorAll('.header__logo');
       
logos.forEach(logo => {
    console.log(logo)
    logo.addEventListener('click', (e)=> {
        e.preventDefault();
        location = location.protocol + '//' + location.host;
    })
})