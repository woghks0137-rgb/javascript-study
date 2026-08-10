/* 
 1. 강아지 여러 마리의 정보를 배열에 저장
    -> dogs: 배열명/dog->요소 변수명
 */
const dogs = [
    {
        name: '초코',
        age: 3,
        breed: '푸들',
        gender: '여아',
        image: 'https://images.unsplash.com/photo-1605244863941-3a3ed921c60d?q=80&w=1470&auto=format&fit=crop',
        description: "사람을 좋아하고 산책을 즐기는 밝은 성격의 아이에요.",
        adoption: true
    },
    {
        name: '보리',
        age: 5,
        breed: '웰시코기',
        gender: '남아',
        image: 'https://images.unsplash.com/photo-1653760188729-894d6518581e?q=80&w=1374&auto=format&fit=crop',
        description: "차분하고 애교가 많아요. 다른 강아지와도 잘 놀아요",
        adoption: true
    },
    {
        name: '콩이',
        age: 5,
        breed: '리트리버',
        gender: '남아',
        image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=1470&auto=format&fit=crop',
        description: "호기심이 많고 장난감을 좋아하는 활발한 강아지입니다",
        adoption: false
    }
]
console.log('dogs:', dogs)
console.log(dogs[0])
console.log(dogs[1])
console.log(dogs[2])

/* 필요한 html 요소  */
const dogList = document.querySelector("#dogList"),
    modal = document.querySelector("#modal"),
    detail = document.querySelector("#detail"),
    closeBtn = document.querySelector("#closeBtn");

/* 강아지 카드 전체를 출력하는 함수 */
function showDogs() {
    //반복해서 만든 카드 html저장
    let html = ''; //초기화

    //dog배열에서 강아지객체를 하나씩 가져옴.
    for (let dog of dogs) {
        //입양 가능 여부에 따라 표시할 글자와 클래스 이름을 정함
        let statusText = '';
        let statusClass = '';
        console.log('dog:', dog)

        //adoption이 true이면 입양가능/false이면 입양완료+addClass(complete) 
        if (dog.adoption === true) {
            statusText = "입양가능"
            statusClass = ''
        } else {
            statusText = "입양완료"
            statusClass = 'complete'
        }
        console.log(statusClass)
        //dog는 객체명이고 반복해서 출력되는 객체 정보
        //dog.name => 강아지명/ dog.age => 강아지나이
        //객체명.속성 => 해당하는 값을 출력

        //console.log(dog.description)
        console.log(`showDetail('${dog.name}')`)

        html += `
            <article class="dog-card">
                <img src="${dog.image}" alt="${dog.name}" class="dog-image">

                <div class="dog-content">
                    <div class="dog-top">
                        <h3>${dog.name}</h3>
                        <span class="dog-status ${statusClass}">${statusText}</span>
                    </div>

                    <ul class="dog-info">
                        <li>나이: ${dog.age}살</li>
                        <li>견종: ${dog.breed}</li>
                        <li>성별: ${dog.gender}</li>
                    </ul>

                    <button 
                    class="detail-btn" type="button" 
                    onclick="showDetail('${dog.name}')">
                        자세히보기
                    </button>
                </div>

            </article>
        `;
        //반복해서 만든 카드를 화면에 출력
        dogList.innerHTML = html;
    }
}
/* ===================  모달창에 출력 되어야 하는 디테일 영역 ================= */
//자세히보기 버튼을 클릭하면 상세 정보 => 모달창
//showDetail(${dog.name}") -> showDetail() 함수가 실행될 때 dog.name이 매개변수에 전달

function showDetail(name) {
    //console.log(name)
    //선택한 강아지를 저장할 변수를 생성-> 초기에는 null
    let selectDog = null;

    //dogs 배열을 반복하면서 클릭한 이름과 같은 강아지를 찾음
    for (let dog of dogs) {
        if (dog.name === name) {
            selectDog = dog;
        }
        console.log('selectDog', selectDog)
    }
    /* showdetail(강아지명)으로 전달된 강아지 이름이 동일한 정보가 없을 때  */
    if (selectDog === null) {
        return //함수가 실행 종료
    }

    /* 입양 가능 여부에 따라서 상세 화면의 문장을 다르게 저장 */
    let adoptionText = '';
    let adoptionClass = '';

    if (selectDog.adoption === true) {
        adoptionText = "현재 입양 상담이 가능합니다."
        adoptionClass = ''
    } else {
        adoptionText = '새로운 가족을 만나 입양이 완료되었습니다.'
        adoptionClass = 'complete'
    }

    //선택한 강아지의 정보를 상세 영역에 출력
    detail.innerHTML = `
        <img class = "detail-image" src="${selectDog.image}" alt = "${selectDog.name}">
        <h2 class="detail-name">${selectDog.name}</h2>
        <p>${selectDog.age}</p>
        <p>${selectDog.breed}</p>
        <div class="detail-description">${selectDog.description}</div>
        <p class="adoption-message${adoptionClass}">${adoptionText}</p>
        `

    //모달에 open 클래스 
    modal.classList.add('open');
}
closeBtn.addEventListener('click', () => {
    modal.classList.remove('open');
})
//모달의 어두운 배경을 클릭하면 닫기
modal.addEventListener("click", function (event) {
    //실제로 클릭한 요소가 modal 일때만 닫힘.
    //modal 콘텐츠를 클릭했을 때는 닫히지 않음.

    if (event.target === modal) {
        modal.classList.remove('open');
    }
})


showDogs()
