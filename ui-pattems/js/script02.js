//html 요소
const header = document.querySelector(".header");
const menuItems = document.querySelectorAll(".gnb-item");

function closeMenus() {
    menuItems.forEach((item) => {
        item.classList.remove("is-open");
    })
    header.classList.remove("is-open");
}
function openMenu(item) {
    closeMenus(); //일단 모두 닫기
    item.classList.add("is-open");
    header.classList.add("is-open")
}
menuItems.forEach((item) => {
    console.log("item", item)
    item.addEventListener("mouseenter", () => openMenu(item))
})
//gnb 전체 영역에서 마우스가 벗어나면 모든 2depth 메뉴와 배경을 닫는다
document.querySelector(".gnb").addEventListener("mouseleave", () => {
    closeMenus();
})
closeMenus();
