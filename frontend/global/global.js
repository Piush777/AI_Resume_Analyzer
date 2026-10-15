
/* =========================================================
   1. DOM ELEMENTS
   ========================================================= */

const menuBtn = document.getElementById("menu-btn");
const sidebarColumn = document.getElementById("sidebar-column");
const sidebar = document.getElementById("sidebar");

const navLinks = document.querySelectorAll(".nav-link");

const profileBtn = document.getElementById("profile-btn");
const profileDropdown = document.getElementById("profile-dropdown");

const sidebarStorageKey = "sidebarExpanded";


/* =========================================================
   2. SIDEBAR HELPERS
   ========================================================= */

function isSidebarExpanded() {
    return sidebarColumn.classList.contains("expanded");
}


/* =========================================================
   3. SIDEBAR OPEN AND CLOSE
   ========================================================= */

function openSidebar() {
    sidebarColumn.classList.add("expanded");
    menuBtn.setAttribute("aria-expanded", "true");
}

function closeSidebar() {
    sidebarColumn.classList.remove("expanded");
    menuBtn.setAttribute("aria-expanded", "false");
}

function toggleSidebar() {
    if (isSidebarExpanded()) {
        closeSidebar();
    } else {
        openSidebar();
    }

    // Remember the user's preference.
    localStorage.setItem(
        sidebarStorageKey,
        String(isSidebarExpanded())
    );
}


/* =========================================================
   4. INITIAL SIDEBAR STATE
   ========================================================= */

function initializeSidebar() {
    const savedState = localStorage.getItem(sidebarStorageKey);

    if (savedState === "true") {
        openSidebar();
    } else {
        closeSidebar();
    }
}

if (menuBtn && sidebarColumn) {
    initializeSidebar();

    menuBtn.addEventListener("click", toggleSidebar);
}


/* =========================================================
   5. ACTIVE NAVIGATION LINK
   ========================================================= */

const currentPage = window.location.pathname.split("/").pop();

navLinks.forEach((link) => {
    const href = link.getAttribute("href");

    if (!href) return;

    const linkPage = href.split("/").pop();

    if (linkPage === currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
    } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
    }
});


/* =========================================================
   6. OPTIONAL PROFILE DROPDOWN
   ========================================================= */

if (profileBtn && profileDropdown) {
    profileBtn.addEventListener("click", (event) => {
        event.stopPropagation();

        const isOpen = profileDropdown.style.display === "block";

        profileDropdown.style.display = isOpen ? "none" : "block";
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest("#profile")) {
            profileDropdown.style.display = "none";
        }
    });
}
