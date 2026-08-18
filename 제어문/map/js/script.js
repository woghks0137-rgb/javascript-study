/* ======================================
   상품 데이터
====================================== */

const products = [
    {
        id: 1,
        name: "베이직 티셔츠",
        category: "패션",
        price: 29000,
        icon: "👕",
        description: "어디에나 편하게 입을 수 있는 기본 반팔 티셔츠입니다."
    },

    {
        id: 2,
        name: "데님 팬츠",
        category: "패션",
        price: 59000,
        icon: "👖",
        description: "데일리 스타일에 잘 어울리는 스트레이트 데님 팬츠입니다."
    },

    {
        id: 3,
        name: "무선 이어폰",
        category: "전자제품",
        price: 89000,
        icon: "🎧",
        description: "가볍고 편안하게 사용할 수 있는 블루투스 이어폰입니다."
    },

    {
        id: 4,
        name: "무선 키보드",
        category: "전자제품",
        price: 45000,
        icon: "⌨️",
        description: "깔끔한 디자인의 휴대용 무선 키보드입니다."
    },

    {
        id: 5,
        name: "테이블 조명",
        category: "생활",
        price: 39000,
        icon: "💡",
        description: "따뜻한 분위기를 만들어주는 미니 테이블 조명입니다."
    },

    {
        id: 6,
        name: "머그컵",
        category: "생활",
        price: 15000,
        icon: "☕",
        description: "심플한 디자인으로 매일 사용하기 좋은 머그컵입니다."
    }
];

/* html요소 가져오기 */
const productList = document.querySelector("#productList");
const productCount = document.querySelector("#productCount");
const categoryBtns = document.querySelectorAll(".category-btn");
const sortSelect = document.querySelector("#sortSelect");
const detailModal = document.querySelector("#detailModal");
const detail = document.querySelector("#detail");
const closeBtn = document.querySelector("#closeBtn");

//현재 선택된 카테고리
let currentCategory = "전체";

//상품 출력 함수 : map() -> 배열 데이터를 html 문자열로 변경해서 화면에 출력
function showProducts(items) {
    // console.log("화면에 출력할 상품 :", items)

    /* map() - items 배열 안의 객체를 하나씩 꺼내서 상품객체 -> html 문자열로 변경 */
    const productHTML = items.map((product) => {
        console.log(product)
        return `
            <article class = "product-card">
            <div class = "product-image">
            ${product.icon}
            </div>
            <div class = "product-info">
            <span>${product.category}</span>
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <div class = "product-bottom">
            <strong class= "price">${product.price.toLocaleString()}원</strong>
            <button class="detail-btn" data-id = "${product.id}">상세보기</button>
            </div>
            </div>
            </article>
        `
    })
    //console.log(productHTML);
    productList.innerHTML = productHTML.join("");

    //현재 화면에 출력된 상품 개수
    productCount.textContent = items.length;

    //html이 만들어진 다음에 상세보기 버튼을 가져온다.
    const detailBtns = document.querySelectorAll(".detail-btn");
    //console.log(detailBtns)
    for (let button of detailBtns) {
        button.addEventListener("click", showDetail)
    }
}
showProducts(products)

/* 상품 상세보기 -> find() -> 조건에 맞는 상품 하나 찾기*/
function showDetail(event) {
    event.preventDefault();

    //클릭한 버튼 가져오기
    const button = event.currentTarget;
    /* data-id는 문자열이므로 id를 비교할 때는 숫자형Number()로 변경 */
    const id = Number(button.dataset.id);
    //console.log(id)

    const product = products.find((product) => {
        return product.id === id
    })
    //console.log(product)

    /* 상세정보 출력 */
    detail.innerHTML = `
    <div class = "detail-image">
        ${product.icon}
    </div>
    <span class="category">
        ${product.category}
    </span>
    <h2>${product.name}</h2>
    <p class = "description">${product.description}</p>
    <p class = "price">${product.price.toLocaleString()}원</p>
    `
    detailModal.classList.add("show")

}
/* ==========================
    카테고리 필터 이벤트
============================*/

for (let button of categoryBtns) {
    console.log(categoryBtns)
    button.addEventListener("click", () => {
        /* 모든 버튼의 active 제거 */
        for (let btn of categoryBtns) {
            btn.classList.remove("active")
        }
        /* 클릭한 버튼에 active 추가 */
        button.classList.add("active")

        /* 선택한 카테고리 저장 */
        currentCategory = button.dataset.category
        console.log(currentCategory)

        //화면에 다시 출력
        updateProducts()
    })
}
/* ==========================
            정렬
============================*/

/* 이벤트 안에서 실행되는 함수를 선언할 때는()괄호를 쓰지 않는다.
왜냐하면 이벤트가 발생되는 시점에서 함수가 실행되어야 하는데 함수선언()을 사용하면
이벤트 발생 전에 함수가 실행돼서 결과가 다르게 출력될 수 있다. */
sortSelect.addEventListener("change", () => { updateProducts })

/* =========================================
     filter() / sort() - 상품 업데이트
===========================================*/

function updateProducts() {
    /* 
        원본 배열 복사
        sort()가 원본 배열을 변경하는 것을 막기 위해 복사본
    */
    let result = [...products];//spread  구문 - ES6 최신문법 -> 배열복사
    //console.log('result:', result)

    /* ===========================================
     1. 카테고리 필터링 filter() 상품 업데이트
    =============================================*/
    if (currentCategory !== "전체") {
        result = result.filter((product) => {
            return (
                product.category === currentCategory
            )
        })
    }
    /* ==========================================================
                     2. sort() - 상품 업데이트
    ============================================================*/
    /* 낮은 가격순 */
    if (sortSelect.value === "low") {
        result.sort((a, b) => {
            return (a.price - b.price)
        })
    }
    /* 높은 가격순 */
    if (sortSelect.value === "high") {
        result.sort((a, b) => {
            return (b.price - a.price)
        })
    }

    /* map() - 최종결과 출력 */
    showProducts(result)

}


/* ==================================
            모달 닫기
====================================*/
closeBtn.addEventListener("click", (event) => {
    detailModal.classList.remove("show")
})

detailModal.addEventListener("click", (event) => {
    if (event.target === detailModal) {
        detailModal.classList.remove("show")
    }
})


