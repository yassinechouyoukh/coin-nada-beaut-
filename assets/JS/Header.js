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
// AUTO-CLOSE MOBILE MENU WHEN CLICKING A LINK
const mobileLinks = document.querySelectorAll(
    "#mobileMenu a, #mobileMenu button.submenu-toggle"
);

mobileLinks.forEach(link => {
    link.addEventListener("click", (e) => {

        // Allow submenu toggle to open submenu without closing
        if (link.classList.contains("submenu-toggle")) return;

        mobileMenu.classList.remove("active");
    });
});
