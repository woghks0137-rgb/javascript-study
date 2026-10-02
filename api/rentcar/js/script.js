/* 렌트카 목록 FAKE JSON SERVER 예제 */

/* 1. HTML 요소 선택 */
//자동차 카드가 출력될 영역
const carList = document.querySelector("#carList");

//자동차 개수가 출력될 요소
const carCount = document.querySelector("#carCount");

//모든 필터
const filterButtons = document.querySelectorAll(".filter-btn");

//2. 전체 자동차 데이터를 저장할 변수
//JSON Server에서 가져온 자동차 데이터를 저장할 변수
//나중에 필터 기능에서 이 데이터를 다시 사용함.
let cars = [];

//3. 자동차 데이터 가져오기
function getCars() {
    //데이터를 가져올 동안 로딩 메세지 출력
    carList.innerHTML = `<p class="message">차량 정보를 불러오는 중입니다.</p>`;

    //JSON Server에서 데이터를 요청
    fetch("http://localhost:3000/cars")
        //서버 응답
        .then((response) => {
            //서버에서 받은 응답 확인
            //console.log("response:", response)

            //서버가 정상적으로 응답하지 않으면
            if (!response.ok) {
                throw new Error("차량 데이터를 가져오지 못했습니다.");
            }
            //JSON에서 받은 JSON 데이터를 javascript 데이터로 변환 
            return response.json();
        })
        //변환된 데이터
        .then(data => {
            //console.log("자동차 데이터:", data)
            cars = data;

            //화면에 자동차 목록을 출력
            renderCars(cars)
        })
        //오류처리
        .catch(error => {
            // console.log(error)
            carList.innerHTML = `<p class="message">차량 정보를 불러오지 못했습니다.</p>`;
        })
}

//4. 자동차 목록 출력함수
//car 데이터에는 화면이 출력할 자동차 배열이 들어옴.
//renderCars(cars) => 자동차 목록
//renderCars(filteredCars) => 필터링된 자동차 목록
function renderCars(carData) {
    //console.log("carData:", carData)
    //기존 화면을 먼저 비워줌
    carList.innerHTML = "";
    //console.log(carData.length)
    carCount.textContent = carData.length;

    //carData에 데이터가 없으면 "해당 조건의 차량이 없습니다"를 carList 영역에 출력
    if (carData.length === 0) {
        carList.innerHTML = `<p class = "message">해당 조건의 차량이 없습니다.</p>`
        return
    }
    //자동차의 배열을 하나씩 반복
    carData.forEach((car) => {
        //console.log("car:", car)
        //대여가능여부
        let statusText = "대여가능";
        let statusClass = "";
        let disabled = "";

        //available 값이 false이면
        if (!car.available) {
            //console.log("carData.availabel:", carData.availabel)
            statusText = "대여 완료"
            statusClass = "unavailable";
            disabled = "disabled"
        }

        /* 자동차 카드 */
        carList.innerHTML += `
        <article class = "car-card">
            <div class = "car-image">
            <img src = "${car.image}" alt = "${car.name}">
            <span class="status ${statusClass}">${statusText}</span>
            </div>

            <div class = "car-info">
                <p class = "car-brand">${car.brand}</p>

                <h3 class = "car-name">${car.name}</h3>

                <div class = "car-option">
                    <span>${car.category}</span>
                    <span>${car.fuel}</span>
                    <span>${car.seats}인승</span>
                    <span>${car.year}년식</span>
                </div>
                <p class = "car-rating">⭐${car.rating}</p>

                <div class = "car-bottom">
                    <p class = "car-price">
                        <strong>${car.price.toLocaleString()}원</strong>
                        1일기준
                    </p>
                    <button type = "button" class = "reserve-btn"${disabled}>${statusText}</button>
                </div>
            </div>
        </article>
        `
    })
}

/* 5. 차종필터 */
filterButtons.forEach(button => {

    button.addEventListener("click", () => {


        //console.log(filterButtons)
        //클릭한 버튼의 data-category 값을 가져옴.
        const category = button.dataset.category

        //active 클래스
        //모든 버튼에서 active 제거
        filterButtons.forEach(btn => {
            btn.classList.remove("active")
        })

        button.classList.add("active")

        //전체
        if (category === "전체") {
            //전체 자동차 출력
            renderCars(cars);
            return;
        }
        //차종필터
        const filtedCars = cars.filter((car) => {
            return car.category === category;

        })
        //console.log(filtedCars)

        renderCars(filtedCars)

    })
})







getCars()