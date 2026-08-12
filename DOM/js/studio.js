const form = document.querySelector("#reservationForm"),
    nameInput = document.querySelector("#name"),
    room = document.querySelector("#room");

const timeRadios = document.querySelectorAll('input[name = "opction"]');
/* console.log(timeRadios) */
const options = document.querySelectorAll(".option");
const roomResult = document.querySelector("#roomResult");
const timeResult = document.querySelector("#timeResult");
const optionResult = document.querySelector("#optionResult");
const totalPrice = document.querySelector("#totalPrice");
//스튜디오 기본 가격
const roomPrice = 30000;

//예약정보 업데이트 함수
function updateReservation() {
    //공간
    if (room.value === '') {
        roomResult.textContent = '선택해주세여'
    } else {
        roomResult.textContent = room.value;
    }

    //시간 - input의 속성 중 name-"time"인 요소 가운데 check된 라디오버튼만 selectTime에 저장
    const selectTime = document.querySelector('input[name = "time"]:checked')
    const time = Number(selectTime.value)

    timeResult.textContent = time + "시간";

    /* 옵션 */
    let optionNames = [];
    let optionPrice = 0;

    //options 배열안의 각각의 배열요소를 option에 저장
    //option에 담긴 요소들 checked:true 인 요소의 value 값만 optionNames 라는 빈 배열에 저장
    for (let option of options) {
        if (option.checked === true) {
            optionNames.push(
                option.value
            )
            optionPrice += Number(option.dataset.price);
        }

        //선택된 옵션 화면 출력
        if (optionNames.length === 0) {
            optionResult.textContent = "선택안함"
        } else {
            optionResult.textContent = optionNames.join(",")
        }
        const price = (roomPrice * time) + optionPrice;
        totalPrice.textContent = price.toLocaleString();
    }
}
//공간변경
room.addEventListener("change", updateReservation);

//시간변경
for (let radio of timeRadios) {
    radio.addEventListener("change", updateReservation)
}
//옵션변경
for (let option of options) {
    option.addEventListener("change", updateReservation)
}

//예약신청
form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (nameInput.value === '') {
        alert("예약자에 이름을 입력해주세요");
        nameInput.focus(); //input란에 커서가 들어감 <-> blur()
        return;
    }
    if (room.value === '') {
        alert("이용할 공간을 선택해주세요");
        room.focus(); //input란에 커서가 들어감 <-> blur()
        return;
    }
    alert(`${nameInput.value}님의 예약 신청이 완료되었습니다.`)
})