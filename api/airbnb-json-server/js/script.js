/* Fake json sever 숙소 예제 */

//1. html요소
const roomList = document.querySelector("#roomList");

//2. 모든 지역 필터
const filterButtons = document.querySelector(".filter-btn");

//전체 숙소를 저장할 변수
let rooms = []

//숙소 데이터  가져오기
function getRooms() {
    //데이터를 가져오는 동안 사용자에게 로딩메세지를 보여줌
    roomList.innerHTML = `
    <p class="message">숙소 정보를 불러오는 중입니다....</p>
    `
    //json 서버에서 데이터를 요청
    fetch('http://localhost:3000/rooms')
        .then(response => {
            console.log("서버응답", response)

            if (!response.ok) {
                throw new Error(
                    '숙소 데이터를 가져오지 못했습니다.'
                )
            }
            return response.json();
        })
        .then(data => {
            console.log("data:", data);
            //서버에서 가져온 숙소데이터를 rooms 변수에 저장
            rooms = data;
            console.log("rooms", rooms)

            //숙소목록을 화면에 출력
            renderRooms(rooms)
        })
        .catch(error => {
            roomList.innerHTML = `
            <p class="message">숙소 정보를 불러오지 못했습니다.</p>
            `;
        })
}
//숙소 데이터 - 화면 UI구현
function renderRooms(rooms) {
    //이전에 출력된 숙소 데이터 지우기
    roomList.innerHTML = ""

    //만약 보여줄 숙소가 없다면 "해당 지역의 숙소가 없습니다" 출력
    if (rooms.length === 0) {
        roomList.innerHTML = "해당 지역의 숙소가 없습니다"
        return;
    }

    //숙소 배열을 하나씩 구현
    roomList.innerHTML = rooms.map((item) => {
        return `
            <div class="room-card">
                <h3>${item.name}</h3>
                <p>${item.location}</p>
                <p>${item.price}원</p>
            </div>
        `
    }).join("");
}
getRooms()

