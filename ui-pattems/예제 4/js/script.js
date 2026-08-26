//html 요소
const locationItems = document.querySelectorAll(".location-item");
const locationButtons = document.querySelectorAll(".location-btn");
//console.log(locationItems); //li
//console.log(locationButtons) //button


//닫기
function closeLocationMenus() {
    locationItems.forEach((item) => item.classList.remove('is-open'));
    locationButtons.forEach((button) => button.setAttribute('aria-expanded', 'false'));
}
locationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const currentItem = button.closest('.location-item')
        /* const willOpen = !currentItem.classList.contains('is-open')
        
        //항상 먼저 모두 닫기
        closeLocationMenus();
        //원래 닫혀있던 메뉴라면 현재 메뉴만 다시 열기

        if(willOpen) {
            currentItem.classList.add('is-open')
            button.setAttribute('aria-expanded', 'true')
        } */
        //현재 메뉴가 닫혀있다면
        if (!currentItem.classList.contains('is-open')) {
            //다른 메뉴 닫기
            closeLocationMenus();

            //클릭한 메뉴 열기
            currentItem.classList.add('is-open');
            button.setAttribute('aria-expanded', 'true');
        } else {
            //현재 클릭한 버튼이 열려있으면
            closeLocationMenus()
        }

    })

})