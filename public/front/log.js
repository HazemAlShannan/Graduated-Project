const sign_in_btn = document.querySelector('#sign-in-btn');
const sign_up_btn = document.querySelector('#sign-up-btn');
const contanier = document.querySelector('.container');

sign_up_btn.addEventListener('click', () => {
  contanier.classList.add('sign-up-mode');
});

sign_in_btn.addEventListener('click', () => {
  contanier.classList.remove('sign-up-mode');
});
