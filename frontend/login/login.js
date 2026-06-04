const passwordInput = document.getElementById("user-password");
const eyeIcon = document.querySelector(".eye-icon");


eyeIcon.addEventListener("click", () => {

    if(passwordInput.type === "password"){

        passwordInput.type = "text";

        eyeIcon.classList.remove("fa-eye");

        eyeIcon.classList.add("fa-eye-slash");

    }

    else{

        passwordInput.type = "password";

        eyeIcon.classList.remove("fa-eye-slash");

        eyeIcon.classList.add("fa-eye");

    }

});