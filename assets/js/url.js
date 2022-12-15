const URL = 'http://127.0.0.1:5000';

const logos = document.querySelectorAll('.header__logo');
       
logos.forEach(logo => {
    console.log(logo)
    logo.addEventListener('click', (e)=> {
        e.preventDefault();
        location = location.protocol + '//' + location.host;
    })
})