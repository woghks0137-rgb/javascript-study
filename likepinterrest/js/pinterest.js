//선택자 변수
const frame = "section",//이미지를 전체 감싸는 박스 
    box = "article", //각각의 카드
    speed = '0.5s',//애니메이션 속도
    activeClass = 'on',//버튼 선택되었을 때 활성화
    btn = document.querySelectorAll("main ul li"); //필터 버튼들
//console.log(btn)
let grid; //Isotope 플러그인의 정보값이 담길 변수

//모든 콘텐츠가 로딩되면
window.addEventListener("load", () => {
    init(); //화면 초기화 함수 -> istope 라이브러리 초기화
    filter(btn); //필터 버튼 기능 함수 호출
})
function init() {
    //section안에 있는 article를 보기 좋게 정렬
    grid = new Isotope(frame, {
        itemSelector: box, //정렬할 대상들(article)
        columWidth: box, //칸 너비도 article 기준
        transtionDuration: speed //실행시간
    })
}
//정렬버튼 기능함수 
function filter(arr) {
    for (let el of arr) {
        el.addEventListener("click", e => {
            e.preventDefault();

            //클릭한 a의 속성 href를 sort 변수에 저장
            const sort = e.currentTarget.querySelector("a").getAttribute("href");

            //isotope 실행
            //arrange 메소드는 isotope가 제공하는 메소드
            //filter -> 뭘 보여줄 것인지를 지정하는 isotope 옵션
            grid.arrange({ filter: sort });;

            //버튼 스타일 초기화
            for (let el of arr) {
                el.classList.remove(activeClass)
            }
            //클릭된 버튼 활성화
            e.currentTarget.classList.add(activeClass)
        })
    }
}