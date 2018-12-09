const avatar_input = document.querySelector('.user-choose-avatar');
const button_save_avatar = document.querySelector('.button-save-avatar');
function preview_images() {
    const user_avatar = document.querySelector('.user-page-avatar');
    if(this.files) {
        [].forEach.call(this.files, readAndPreview);
    }
    readAndPreview = (file) => {
        let reader = new FileReader();
        reader.addEventListener('load', function() {
            user_avatar.setAttribute('src', this.result);
        }, false);
        reader.readAsDataURL(file);
    }
    const input = avatar_input.value;
    if(input.length > 0) {
        button_save_avatar.disabled = false;
    } else {
        button_save_avatar.disabled = true;
    }
}
avatar_input.addEventListener('change', preview_images, false);