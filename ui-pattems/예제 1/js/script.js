//html 요소 변수에 저장
const menuBtn = document.querySelector(".menu-btn");
const navWrap = document.querySelector(".nav-wrap")

//메뉴닫기
//resize에서도 사용하기 때문에 함수로 만든다.
function closeMenu() {
    menuBtn.classList.remove("is-open")
    navWrap.classList.remove("is-open")
    document.body.classList.remove("no-scroll")
}

//메뉴버튼 클릭
menuBtn.addEventListener("click", () => {
    //nav-wrap에 is-open 클래스를 추가/제거
    //toggle() - add/remove가 하나의 요소에 적용
    //toggle() - class가 추가되면 true / 제거되면 false
    const isOpen = navWrap.classList.toggle("is-open");
    /*  console.log(isOpen) */

    //nav-wrap의 상태에 맞춰서 메뉴버튼과 body에도 클래스를 추가/제거
    menuBtn.classList.toggle("is-open", isOpen)
    document.body.classList.toggle("no-scroll", isOpen)
})

//모바일 메뉴가 열린 상태에서 화면이 PC크기로 커지면 메뉴 상태 초기화
window.addEventListener("resize", () => {
    if (window.innerWidth > 640) {
        closeMenu()
    }
})