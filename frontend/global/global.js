const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const currentPage=window.location.pathname.split("/").pop();
const navLinks=document.querySelectorAll(".nav-link");
const profileBtn = document.getElementById("profile-btn");
const profileDropdown = document.getElementById("profile-dropdown");

menuBtn.addEventListener("click", () => {

    sidebar.style.transform = "translateX(0)";

    menuBtn.style.visibility = "hidden";

    overlay.classList.add("active");

});


closeBtn.addEventListener("click", () => {

    sidebar.style.transform = "translateX(-100%)";

    menuBtn.style.visibility = "visible";

    overlay.classList.remove("active");

});

overlay.addEventListener("click", () => {

    sidebar.style.transform = "translateX(-100%)";

    menuBtn.style.visibility = "visible";

    overlay.classList.remove("active");

});

navLinks.forEach((link)=>{

    const linkPage=link.getAttribute("href").replace("./","");

    if(linkPage===currentPage){

        link.classList.add("active-link");

    }

});

profileBtn.addEventListener("click", () => {

    if(profileDropdown.style.display === "block"){

        profileDropdown.style.display = "none";

    }

    else{

        profileDropdown.style.display = "block";

    }

});