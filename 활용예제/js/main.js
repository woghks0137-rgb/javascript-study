const plusBtn = document.querySelector(".plus-btn");
const minusBtn = document.querySelector(".minus-btn");
const totalPrice = document.querySelector(".total-price");
const quantity = document.querySelector(".quantity");

let number = 1
let price = 35000
plusBtn.addEventListener("click", () => {
    number++
    quantity.textContent = number
    totalPrice.textContent = `${(price * number).toLocaleString()}원`
})
minusBtn.addEventListener("click", () => {
    if (number > 1) {
        number--
        quantity.textContent = number
        totalPrice.textContent = `${(price * number).toLocaleString()}원`
    }
})