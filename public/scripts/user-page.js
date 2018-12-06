const avatar_input = document.querySelector('.user-choose-avatar');

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
}
avatar_input.addEventListener('change', preview_images, false);