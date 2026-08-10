/* 객체 배열 */
const cars = [
    {
        name: '아반떼',
        type: '준준형',
        fuel: '가솔린',
        price: 50000
    },
    {
        name: '쏘나타',
        type: '중형',
        fuel: '가솔린',
        price: 70000
    },
    {
        name: '캐스퍼',
        type: '경차',
        fuel: '가솔린',
        price: 45000
    },
    {
        name: '쏘렌토',
        type: 'SUV',
        fuel: '디젤',
        price: 150000
    },
    {
        name: '카니발',
        type: '승합',
        fuel: '디젤',
        price: 140000
    }
]
/* console.log(cars[2].fuel) */

/* 출력될 요소 */
const carList = document.querySelector("#carList");

/* 자동차 정보를 매개변수로 전달 받아서 함수를 호출해 출력 */
function showCar(car) {
    console.log(car); //쏘나타 객체 정보
    carList.innerHTML += `
        <div class = 'car-card'>
            <h2>${car.name}</h2>
            <p>${car.fuel}</p>
            <p>${car.type}</p>
            <p>${car.price}</p>
        </div> 
    `
}
//반복문으로 배열의 객체를 하나씩 꺼내오기
for (let car of cars) {
    console.log('현재 car', car)
    showCar(car)
}




