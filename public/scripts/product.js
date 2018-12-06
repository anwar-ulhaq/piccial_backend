const product_small_images = document.querySelectorAll('.small-image-wrapper img');
const product_big_image = document.querySelector('.big-image');
const vote_button =  document.querySelector('i.fas.fa-heart');

for (let i = 0; i < product_small_images.length; i++) {
    const small_image = product_small_images[i];
    small_image.addEventListener('click', (e) => {
        e.preventDefault();
        let small_image_src = small_image.getAttribute('src');
        product_big_image.setAttribute('src', small_image_src);
        product_big_image.classList.add('blur');
        product_big_image.addEventListener('webkitAnimationEnd', () => {
            product_big_image.classList.remove('blur');
        });
    });
}
vote_button.addEventListener('click', () => {
    vote_button.classList.toggle('vote-button-clicked');
    vote_button.classList.toggle('vote-clicked-animation');
});
