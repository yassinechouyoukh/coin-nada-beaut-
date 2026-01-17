const menuBtn = document.getElementById("menuBtn");
const closeMenu = document.getElementById("closeMenu");
const mobileMenu = document.getElementById("mobileMenu");
const submenuToggle = document.querySelector(".submenu-toggle");
const submenu = document.querySelector(".submenu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.add("active");
});

closeMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
});

submenuToggle.addEventListener("click", () => {
    submenu.style.display =
        submenu.style.display === "flex" ? "none" : "flex";
});
