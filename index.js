import { menuArray } from './data.js'

const menu = document.getElementById("menu")
const order = document.getElementById("order")
const payment = document.getElementById("payment")


let orderArray = []

render()

document.addEventListener("click",(e) => {
    if(e.target.dataset.add){
        handleAddClick(e.target.dataset.add)
    }
    if(e.target.dataset.remove){
        handleRemoveClick(e.target.dataset.remove)
    }
    if(e.target.id === "order-btn"){
        renderPayment()
    }
    if (e.target.id === "pay-btn") {
        handlePay()
    }
})


function render(){
    menu.innerHTML = getMenuHtml()
}

function renderOrder(){
    order.innerHTML = getOrderHtml()
}

function renderPayment(){
    payment.classList.remove("hidden")
    payment.innerHTML = getPaymentHtml()
}

function handleAddClick(productId){
    const product = menuArray.find(item => item.id == productId)
    orderArray.push(product)
    order.classList.remove("hidden")
    renderOrder()
}
function handleRemoveClick(productId){
    const index = orderArray.findIndex(item => item.id == productId)
    if (index !== -1) {
        orderArray.splice(index, 1)
    }
    if (orderArray.length === 0) {
        order.classList.add("hidden")
    } else {
        renderOrder()
    }
}

function handlePay() {
    payment.innerHTML = `
        <div class="thanks">
            <h2>Thanks for your order!</h2>
            <p>Your food is on the way 🚀</p>
        </div>
    `

    orderArray = []
    order.classList.add("hidden")
}

function getMenuHtml(){
    let menuHtml = ``

    menuArray.forEach(function(product) {
        menuHtml += `
            <div id="productCard">
                <div class="product">
                    <h1 id="emoji">${product.emoji}</h1>
                    <div class="description">
                        <h2>${product.name}</h2>
                        <p>${product.ingredients.join(", ")}</p>
                        <h3>$${product.price}</h3>
                    </div>
                </div>
                <button class="add-btn" data-add="${product.id}">+</button>
            </div>
        `
    })

    return menuHtml
}


function getOrderHtml(){
    let orderHtml = `<h2>Your order</h2>`
    
    let total = 0

    orderArray.forEach(product => {
        total += product.price
        orderHtml += `
            <div id="product-order">
                <div>
                    <h3>${product.name}</h3>
                    <button id="remove-btn" data-remove="${product.id}">(remove)</button>
                </div>
                <p>$${product.price}</p>
            </div>
        `
    })
    
    orderHtml += `
        <hr id="order-divider">
        <div id="total-price">
            <h3>Total price:</h3>
            <p>$${total}</p>
        </div>
        <button id="order-btn">Complete order</button>
    `

    return orderHtml
}

function getPaymentHtml(){
    let paymentHtml
    
    paymentHtml = `
        <div id="payment" class="hidden"></div>
        <div class="overlay">
            <form>
                <h2>Enter card details</h2>
                <input 
                    type="text" 
                    id="card-name" 
                    placeholder="Enter Name"
                    required>
                <input 
                    type="text" 
                    inputmode="numeric" 
                    pattern="[0-9]{13,19}" 
                    placeholder="Card Number"
                    required>
                <input
                    type="password"
                    inputmode="numeric"
                    pattern="[0-9]{3,4}"
                    maxlength="3"
                    placeholder="CVV"
                    required>
                <button id="pay-btn">PAY</button>
            </form>
        </div>
        </div>
    `
    return paymentHtml
}


