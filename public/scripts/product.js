const product_small_images = document.querySelectorAll('.small-image-wrapper img');
const product_big_image = document.querySelector('.big-image');
const input_comment = document.querySelector('.comment');
const comment_button = document.querySelector('.comment-submit');
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
function validateComment() {
    const input = input_comment.value;
    if(input.length > 0) {
        comment_button.disabled = false;
    } else {
        comment_button.disabled = true;
    }
}