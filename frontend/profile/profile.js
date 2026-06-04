const uploadInput = document.getElementById("profile-upload");

const photoButton = document.querySelector(".photo-btn");

const profilePreview = document.getElementById("profile-preview");

const defaultIcon = document.getElementById("default-icon");


photoButton.addEventListener("click", () => {

    uploadInput.click();

});


uploadInput.addEventListener("change", () => {

    const file = uploadInput.files[0];

    if(file){

        const imageURL = URL.createObjectURL(file);

        profilePreview.src = imageURL;

        profilePreview.style.display = "block";

        defaultIcon.style.display = "none";

    }

});