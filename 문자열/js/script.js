const products = [
    { id: 1, name: "Basic T-shirt", category: "Fashion", price: 29000 },
    { id: 2, name: "Blue Jeans", category: "Fashion", price: 59000 },
    { id: 3, name: "Wireless Earbuds", category: "Electronics", price: 89000 },
    { id: 4, name: "Mechanical Keyboard", category: "Electronics", price: 119000 }
];

const searchInput = document.querySelector("#searchInput");
const reserBtn = document.querySelector("#reserBtn");
const resultText = document.querySelector("#resultText");
const productList = document.querySelector("#productList");

function renderProducts(items) {
    /* 기존 내용을 지워줌 - 이 구문을 생략하면 결과가 계속 이어서 보여지므로
    초기에 지워주는 코드를 입력해줘야 한다.*/
    productList.innerHTML = ''

    items.forEach((item) => {
        console.log('items:', items)
        productList.innerHTML += `
        <article class = "card">
        <p class="muted">${item.category}</p>
        <h2>${item.name}</h2>
        <p>${item.price.toLocaleString()}원</p>
        </article>
        `

        //resultText 영역에 상품 개수를 출력 ->

        resultText.textContent = `${items.length}개의 상품을 찾았습니다.`
    })
}
renderProducts(products)

//input 이벤트는 입력창에 값이 바뀔 때마다 발생
//따라서 실시간 검색 기능에 자주 선언됨
searchInput.addEventListener("input", () => {
    //value = 입력창에 입력된 문자열
    //trim() = 문자열 양쪽의 불필요한 공백 제거
    const Keyword = searchInput.value.trim();
    console.log(Keyword)

    //toLowerCase() - 모두 소문자로 변경
    //영어 검색시 대소문자로 인한 오류를 줄이기 위해서 사용
    const lowerkeyword = searchInput.value.toLowerCase();
    console.log(lowerkeyword)

    const result = products.filter((product) => {
        //상품명도 소문자로 바꾼 뒤 비교
        const lowerName = product.name.toLowerCase();

        //includes() - 문자열 안에 특정 문자열이 포함되어 있는지 확인
        //포함되어 있으면 true , 아니면 false 

        return lowerName.includes(lowerkeyword)
    })
    console.log("result:", result)
    renderProducts(result)
})
//초기화 버튼
reserBtn.addEventListener("click", () => {
    searchInput.value = '';
    renderProducts(products)
})
renderProducts(products)
