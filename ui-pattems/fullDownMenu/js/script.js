/* ================================
    FUll Down Renposive Menu

    [PC] gnb영역에 마우스가 올라가면 
    -> header menu-open 클래스 추가
    -> 모든 2depth + gnb-bg(배경)가 표시
    
    [Mobile] 햄버거 클릭
    -> 전체 메뉴 표시
    -> 1depth 클릭 -> 해당 2depth만 아코디언 형태로 표시
    
==================================*/

/* html 요소 */
const header = document.querySelector(".header");
/* gnb 영역 */
const gnb = document.querySelector(".gnb");
/* 모바일 햄버거 메뉴 */
const menuBtn = document.querySelector(".menu-btn");
/* 모든 depth1 메뉴 */
const gnbItems = document.querySelectorAll(".gnb-item");//li

/* pc FullDown Menu */
/* pc에서 gnb 영역에 마우스가 들어왔을 때 */
gnb.addEventListener("mouseenter", () => {
    /* pc에서만 실행 - 모바일에서는 hover를 사용하지 않음 */
    if (window.innerWidth > 768) {
        /* header에 menu-open 클래스 추가 */
        header.classList.add("menu-open")
    }
})

//gnb에서 마우스가 벗어났을 때
gnb.addEventListener("mouseleave", () => {
    if (window.innerWidth > 768) {
        /* fulldown Menu 닫기 */
        header.classList.remove("menu-open");

        /* 현재 활성화된 depth1도 초기화 */
        removeActiveMenu()
    }
})
/* pc 현재 메뉴 표시 */
/* 각각의 depth1에 이벤트 등록 */
gnbItems.forEach((item) => {
    const link = item.querySelector(".gnb-link"); //a요소
    const subMenu = item.querySelector(".sub-menu");//서브 ul 메뉴

    /* pc */
    item.addEventListener("mouseenter", () => {

        if (window.innerWidth > 768) {
            removeActiveMenu();
            item.classList.add("active");
        }

    });
    link.addEventListener("click", (event) => {
        /* 모바일 화면에서만 실행 */
        if (window.innerWidth <= 768) {
            /* 2depth가 없다면 일반 링크로 이동하도록 종료 */
            if (!subMenu) { return; }

            /* href = "#" 이동방지 */
            event.preventDefault();

            //현재 메뉴가 열려있는지 확인
            //true -> 열려있음
            //false -> 닫혀있음
            const isOpen = item.classList.contains('active')

            //모든 메뉴 닫는다 - 모바일에서 아코디언 서브메뉴가 닫힌 상태
            removeActiveMenu();

            //클릭한 메뉴만 다시 활성화(메뉴가 열림)
            if (!isOpen) {
                item.classList.add("active")
            }

        }
    })
})

/* 모바일 햄버거 메뉴 */
menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active")
    /* mobile gnb 열기 / 닫기 */
    gnb.classList.toggle("open")
    if (!gnb.classList.contains("open")) {
        removeActiveMenu();
    }

    //전체 메뉴를 닫을 때 2depth도 초기화
    removeActiveMenu()
})




/* 모든 active 제거함수 */
function removeActiveMenu() {
    gnbItems.forEach((item) => {
        item.classList.remove("active")
    })
}

