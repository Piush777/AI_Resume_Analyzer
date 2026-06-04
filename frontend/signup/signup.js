const eyeIcons = document.querySelectorAll(".eye-icon");
const signupForm = document.querySelector(".signup-form");
const passwordInput = document.getElementById("user-password");
const confirmPasswordInput = document.getElementById("confirm-password");
const fullNameInput = document.getElementById("user-name");
const emailInput = document.getElementById("user-email")


eyeIcons.forEach((eyeIcon) => {

    eyeIcon.addEventListener("click", () => {

        const passwordInput = eyeIcon.previousElementSibling;

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

});

signupForm.addEventListener("submit", (e)=>{

    e.preventDefault();

    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if(
    fullName === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === ""
    ){
        alert("Please fill all fields");
        return;
    }


    if(password.length < 8){
        alert("Password must be at least 8 characters long");
        return;
    }

    if(password !== confirmPassword){
        alert("Passwords do not match");
        return;
    }

    alert("Signup Successful");

    signupForm.reset();

});