//html 요소
const openBtn = document.querySelector(".open-btn");
const closeBtn = document.querySelector(".close-btn");
const totalMenu = document.querySelector(".total-menu");
const dim = document.querySelector(".dim");
const megaItems = document.querySelectorAll(".mega-item")
const megaButtons = document.querySelectorAll(".mega-title")

function openTotalMenu() {
    totalMenu.classList.add("is-open");
    dim.classList.add('is-open');
    document.body.classList.add("no-scroll");
    totalMenu.setAttribute('aria-hidden', 'false'); /* pc */
    openBtn.setAttribute('aria-expanded', 'true'); /* mobile */
}
function closeTotalMenu() {
    totalMenu.classList.remove("is-open");
    dim.classList.remove('is-open');
    document.body.classList.remove("no-scroll");
    totalMenu.setAttribute('aria-hidden', 'true'); /* pc */
    openBtn.setAttribute('aria-expanded', 'false'); /* mobile */

    //모바일 아코디언 상태도 함께 초기화
    //aria-expanded = "true" => 메뉴가 열려있는 상태
    //aria-expanded =  "false" => 메뉴가 닫혀있는 상태
    megaItems.forEach((item) => {
        item.classList.remove("is-open");
    })
    megaButtons.forEach((button) => button.setAttribute('aria-expanded', 'false'))
}
openBtn.addEventListener("click", openTotalMenu)
closeBtn.addEventListener("click", closeTotalMenu)
dim.addEventListener("click", closeTotalMenu)


//아코디언
megaButtons.forEach((button) => {
    /* 모바일 사이즈  640보다 윈도우가 크면 아무것도 실행하지 않고 종료 */
    button.addEventListener("click", () => {
        if (window.innerWidth > 640) return

        //closest -> 나와 가장 가까운 부모("요소명")
        //closest -> parent() 나의 직계부모
        //parents() = 부모의 부모
        const currentItem = button.closest(".mega-item")
        const willOpen = !currentItem.classList.contains('is-open');

        /* 
            is-open 클래스가 있으면 true -> !(부정연산자 = 반대) => false
            is-open 클래스가 없으면 false -> !(부정연산자 = 반대) => true
            --------------------------------------------------------------
            지금 클릭한 li가 열려 있으면 willOpen = false
            지금 클릭한 li가 닫혀 있으면 willOpen = true
            --> 지금 클릭한 li를 열지 말지를 판단하는 기준
        */

        //다른 메뉴 닫기
        megaItems.forEach((item) => item.classList.remove('is-open'));
        megaButtons.forEach((btn) => btn.setAttribute('aria-expanded', "false"));

        //클릭한 메뉴가 원래 닫혀 있으면 연다
        if (willOpen) {
            currentItem.classList.add('is-open')
            button.setAttribute('aria-expanded', "true")
        }
    })
})
//ESC 키로도 전체 메뉴를 닫을 수 있게한다.
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeTotalMenu()
    }
})
