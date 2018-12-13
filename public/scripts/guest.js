/* Author: Phat Doan */
/* This javascript file is for guest.ejs page, most of the function here is the same as main.js */

const searchBtn_click = document.querySelector('.search-click');
const searchBtn_trigger = document.querySelector('.search-trigger');
const searchInput = document.querySelector('.search-box input');
const closeBtn = document.querySelector('.close-button');
const indicators = document.querySelectorAll('.carousel-indicators li');
const carousel_slides = document.querySelectorAll('.carousel-item');
const section_list_items = document.querySelector('.list-items');
const menu_bar = document.querySelector('.menu-bar');
const options_wrapper = document.querySelector('.options-wrapper');
const menu_options = document.querySelector('.menu-options');
const next_slide_button = document.querySelector('.next-slide');
const card_title = document.querySelectorAll('.card-title');
const product = document.querySelector('section.product');
const darkBg = document.querySelector('.dark-bg');
const product_big_image = document.querySelector('.big-image');
const product_small_images = document.querySelectorAll('.small-image-wrapper img');
const product_close_button = document.querySelector('.product-close-button');
const search_box = document.querySelector('.search-box');
const menu_options_a = document.querySelectorAll('.menu-options a');
let cur_slide_index = 0;
let cur_indicator_index = 0;

menu_options.addEventListener('click', () => {
    options_wrapper.classList.toggle('drop-down-menu-animation');
});
document.body.addEventListener('click', () => {
    options_wrapper.classList.remove('drop-down-menu-animation');
}, true);
let lastScrollTop = window.pageYOffset;
window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    menu_bar.style.opacity = "0";
    if(window.pageYOffset >= 1) { //When user scroll, hide the menu
        menu_bar.classList.add('scroll');
        menu_options_a.forEach(aTag => {
            aTag.style.marginTop = '3vh';
        });
        search_box.style.height = '10vh';
        if (scrollTop > lastScrollTop){ //User scroll down, hide the menu, user scroll up, show the menu
            menu_bar.classList.remove('menu-bar-animation');
        } else {
            menu_bar.classList.add('menu-bar-animation');            
        }
    } else {
        menu_bar.classList.remove('scroll');
        menu_options_a.forEach(aTag => {
            aTag.style.marginTop = '6vh';
        });
        search_box.style.height = '15vh';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; //Compare the current position so lastScrollTop doesnt have negative value
 }, false);

searchBtn_click.addEventListener('click', () => { //Animation for search box
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
let slide_interval = setInterval(() => { //Change the slide every 5 seconds
    let cur_slide_pos = 0;
    let cur_slide = document.querySelector('.carousel-item.active');
    for(cur_slide_pos = 0; cur_slide = cur_slide.previousElementSibling; cur_slide_pos++){} //Get the active slide
    if(cur_slide_pos < carousel_slides.length-1) {
        for (let i = 0; i < carousel_slides.length; i++) { //before active another slide, remove all the 'active' class first
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
        clearInterval(slide_interval); //when user click the indicator, remove the timing for each slide
        for (let i = 0; i < indicators.length; i++) { //remove 'active' class for each indicator
            indicators[i].classList.remove('active');            
        }
        this.classList.add('active'); //add 'active' class for next indicator
        let active_indicator = this;
        var cur_indicator = 0;
        for (cur_indicator = 0; active_indicator = active_indicator.previousElementSibling; cur_indicator++) {}
        for (let i = 0; i < carousel_slides.length; i++) {
            carousel_slides[i].classList.remove('active');
            carousel_slides[cur_indicator].classList.add('active');
        }
    });
}
next_slide_button.addEventListener('click', () => {//when user click the angle-down on the carousel, go to next slide
    clearInterval(slide_interval);
    let cur_slide = carousel_slides[cur_slide_index];
    let cur_indicator = indicators[cur_indicator_index];
    if(cur_slide_index < carousel_slides.length - 1) {//next slide position is 0 when user is at the last slide (3)
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


