function toggleMenu() {
    const menu = document.querySelector("#menu");

    menu.classList.toggle('top-7');
    menu.classList.toggle('opacity-100');
    menu.classList.toggle('-top-96');
    menu.classList.toggle('opacity-0');
};

function openNavbar() {
const btn = document.querySelector("#menu-btn");
btn.addEventListener("click", toggleMenu)
}

openNavbar();
