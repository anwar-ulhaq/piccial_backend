const searchBtn_click = document.querySelector('.search-click');
const searchBtn_trigger = document.querySelector('.search-trigger');
const searchInput = document.querySelector('.search-box input');
const closeBtn = document.querySelector('.close-button');
const indicators = document.querySelectorAll('.carousel-indicators li');
const carousel_slides = document.querySelectorAll('.carousel-item');
const section_list_items = document.querySelector('.list-items');
const menu_bar = document.querySelector('.menu-bar');
const next_slide_button = document.querySelector('.next-slide');
const card_title = document.querySelectorAll('.card-title');
const product = document.querySelector('section.product');
const darkBg = document.querySelector('.dark-bg');
const product_big_image = document.querySelector('.big-image');
const product_small_images = document.querySelectorAll('.small-image-wrapper img');
const product_close_button = document.querySelector('.product-close-button');
const add_item_button = document.querySelector('.add-item-button');
const upload_post_section = document.querySelector('.upload-post');
const choose_img = document.querySelector('.choose-img');
const m_user_avatar = document.querySelector('.m-user-avatar');
const options_wrapper = document.querySelector('.options-wrapper');
const menu_options = document.querySelector('.menu-options');
const search_box = document.querySelector('.search-box');
let cur_slide_index = 0;
let cur_indicator_index = 0;

menu_options.addEventListener('click', () => {
    options_wrapper.classList.toggle('visible');
});

let lastScrollTop = window.pageYOffset;
window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    menu_bar.style.opacity = "0";
    if(window.pageYOffset >= 10) {
        menu_bar.classList.add('scroll');
        search_box.style.height = '10vh';
        m_user_avatar.style.marginTop = '1.5vh';
        if (scrollTop > lastScrollTop){
            menu_bar.classList.remove('menu-bar-animation');
        } else {
            menu_bar.classList.add('menu-bar-animation');            
        }
    } else {
        menu_bar.classList.remove('scroll');
        search_box.style.height = '15vh';
        m_user_avatar.style.marginTop = '5vh';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
 }, false);

searchBtn_click.addEventListener('click', () => {
    searchBtn_click.setAttribute('style', 'opacity: 0; visibility: hidden;');
    searchBtn_trigger.classList.add('magnify-animation');
    searchBtn_trigger.classList.add('magnify-active');
    searchInput.classList.add('expand');
    closeBtn.classList.add('close-button-animation');
});
closeBtn.addEventListener('click', () => {
    searchBtn_click.setAttribute('style', 'opacity: 1; visibility: visible;');
    searchBtn_trigger.classList.remove('magnify-animation');
    searchInput.classList.remove('expand');
    closeBtn.classList.remove('close-button-animation');
    searchInput.classList.add('shrink');
    searchInput.addEventListener('webkitAnimationEnd', () => {
        searchInput.classList.remove('shrink');
    });
});
let slide_interval = setInterval(() => {
    let cur_slide_pos = 0;
    let cur_slide = document.querySelector('.carousel-item.active');
    for(cur_slide_pos = 0; cur_slide = cur_slide.previousElementSibling; cur_slide_pos++){}
    if(cur_slide_pos < carousel_slides.length-1) {
        for (let i = 0; i < carousel_slides.length; i++) {
            carousel_slides[i].classList.remove('active');
            indicators[i].classList.remove('active');
        }
        carousel_slides[cur_slide_pos].nextElementSibling.classList.add('active');
        indicators[cur_slide_pos].nextElementSibling.classList.add('active');
    } else {
        for (let i = 0; i < carousel_slides.length; i++) {
            carousel_slides[i].classList.remove('active');
            indicators[i].classList.remove('active');
        }
        carousel_slides[0].classList.add('active');
        indicators[0].classList.add('active');
    }
}, 5000);
for (let i = 0; i < indicators.length; i++) {
    indicators[i].addEventListener('click', function() {
        clearInterval(slide_interval);
        for (let i = 0; i < indicators.length; i++) {
            indicators[i].classList.remove('active');            
        }
        this.classList.add('active');
        let active_indicator = this;
        var cur_indicator = 0;
        for (cur_indicator = 0; active_indicator = active_indicator.previousElementSibling; cur_indicator++) {}
        for (let i = 0; i < carousel_slides.length; i++) {
            carousel_slides[i].classList.remove('active');
            carousel_slides[cur_indicator].classList.add('active');
        }
    });
}
next_slide_button.addEventListener('click', () => {
    clearInterval(slide_interval);
    let cur_slide = carousel_slides[cur_slide_index];
    let cur_indicator = indicators[cur_indicator_index];
    if(cur_slide_index < carousel_slides.length - 1) {
        cur_slide_index++;
        cur_indicator_index++;
    } else {
        cur_slide_index = 0;
        cur_indicator_index = 0;
    }
    let next_slide = carousel_slides[cur_slide_index];
    let next_indicator = indicators[cur_indicator_index];
    cur_slide.classList.remove('active');
    next_slide.classList.add('active');
    cur_indicator.classList.remove('active');
    next_indicator.classList.add('active');
});

for (let i = 0; i < card_title.length; i++) {
    const element = card_title[i];
    element.addEventListener('click', () => {
        product.classList.add('product-scale');
        darkBg.setAttribute('style', 'opacity: 1; visibility: visible');
        product_close_button.setAttribute('style', 'opacity: 1; visibility: visible');
    });
}

const product_close = () => {
    product.classList.remove('product-scale');
    darkBg.setAttribute('style', 'opacity: 0; visibility: hidden');
    product_close_button.setAttribute('style', 'opacity: 0; visibility: hidden');
    upload_post_section.classList.remove('scale-bottom-right');
}
darkBg.addEventListener('click', product_close);
product_close_button.addEventListener('click', product_close);

add_item_button.addEventListener('click', function () {
    darkBg.setAttribute('style', 'opacity: 1; visibility: visible');    
    product_close_button.setAttribute('style', 'opacity: 1; visibility: visible');
    upload_post_section.classList.add('scale-bottom-right');
});


for (let i = 0; i < product_small_images.length; i++) {
    const small_image = product_small_images[i];
    small_image.addEventListener('click', (e) => {
        e.preventDefault();
        let small_image_src = small_image.getAttribute('src');
        product_big_image.setAttribute('src', small_image_src);
    });
}
function preview_images() {
    const images_preview = document.querySelector(".images-preview");
    if(this.files) {
        if(this.files.length <= 4) {
            [].forEach.call(this.files, readAndPreview);
        } else {
            choose_img.value = "";
            alert('Limited to 4 images only');
        }
    }
    readAndPreview = (file) => {
        let reader = new FileReader();
        reader.addEventListener('load', function() {
            let img = document.createElement('img');
            let img_div = document.createElement('div');
            img_div.setAttribute('class', 'img-div');
            img.setAttribute('src', this.result);
            img_div.appendChild(img);
            images_preview.appendChild(img_div);
        }, false);

        reader.readAsDataURL(file);
    }
}
choose_img.addEventListener('change', preview_images, false);


