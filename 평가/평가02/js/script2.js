const trips = [
    { id: 1, name: "성산일출봉", category: "제주", price: 120000, image: "https://images.unsplash.com/photo-1548115184-bc6544d06a58?auto=format&fit=crop&w=800&q=80", description: "제주의 아름다운 일출을 볼 수 있는 대표 관광지입니다." },
    { id: 2, name: "협재해수욕장", category: "제주", price: 150000, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", description: "맑은 바다와 넓은 백사장이 아름다운 제주 여행지입니다." },
    { id: 3, name: "광안리", category: "부산", price: 100000, image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80", description: "광안대교 야경과 바다를 함께 즐길 수 있습니다." },
    { id: 4, name: "해운대", category: "부산", price: 130000, image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80", description: "부산을 대표하는 해변 관광지입니다." },
    { id: 5, name: "안목해변", category: "강릉", price: 90000, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80", description: "커피거리와 바다를 함께 즐길 수 있는 여행지입니다." },
    { id: 6, name: "경포대", category: "강릉", price: 110000, image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=800&q=80", description: "아름다운 호수와 동해 바다를 만날 수 있습니다." }
];

const result = document.querySelector(".result");
const button = document.querySelector('.btn');
const input = document.querySelector(".name");

button.addEventListener("click", function () {
    const key = input.value;

    const trip = trips.find((trip) => {
        return trip.name === key
    })
    if (trip) {
        result.innerHTML = `
        <img src="${trip.image}" alt="${trip.name}">
                    <h3>${trip.name}</h3>
            <p>${trip.category}</p>
            <p>${trip.description}</p>
            <p>${trip.price.toLocaleString()}원</p>
                `
    } else {
        result.textContent = "해당 여행지를 찾지 못했습니다."
    }

})