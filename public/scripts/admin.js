/* Author: Phat Doan */
/* Javascript for admin page, when admin user delete a post, a modal box will show */

const modal_box = document.querySelector('.modal-box');
const modal_bg = document.querySelector('.modal-bg');
const modal_n = document.querySelector('.modal-n');
const delete_button = document.querySelector('.delete-post-button');

delete_button.addEventListener('click', () => {
    modal_bg.setAttribute('style', 'opacity: 1; visibility: visible;');
    modal_box.classList.add('modal-box-animation');
});

modal_bg.addEventListener('click', () => {
    modal_bg.setAttribute('style', 'opacity: 0; visibility: hidden;');
    modal_box.classList.remove('modal-box-animation');
});
modal_n.addEventListener('click', (e) => {
    e.preventDefault();
    modal_bg.setAttribute('style', 'opacity: 0; visibility: hidden;');
    modal_box.classList.remove('modal-box-animation');
});

