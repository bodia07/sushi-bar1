const url= "https://script.google.com/macros/s/AKfycbypatMCny4p_oHEtPc4iYT2Higca1RNke_DYzZsOcC7LF869gG-VG2fODFD4fSWFYk6zA/exec"
const sheet="Sushi data shop"

async function getProducts() {
    // Виконуємо запит до файлу "store_db.json" та очікуємо на відповідь
    const response = await fetch("sushi_db.json")
    
    const  products  = await response.json();
    // Повертаємо отримані продукти
    return products
}
function getCardHTML(item) {
    return `<div class="col">
            <div class="card mb-3 py-2" style="">
                <div class="row g-0">
                  <div class="col-md-6 d-flex align-items-center px-2">
                    <img src="img/${item.image}" class="img-fluid"  alt="${item.title}">
                  </div>
                  <div class="col-md-6">
                    <div class="card-body  d-flex flex-column justify-content-between">
                      <h5 class="card-title">${item.title}</h5>
                      <p class="card-text">${item.description}</p>
                      <h6>${item.price} грн₴</h6>
                            <button class="fancy order-btn">
                                <span class="top-key"></span>
                                <span class="text">замовити</span>
                                <span class="bottom-key-1"></span>
                                <span class="bottom-key-2"></span>
                            </button>
                    </div>
                  </div>
                </div>
              </div>
              </div>`
}

function getCookieValue(cookieName) {
    // Розділяємо всі куки на окремі частини
    const cookies = document.cookie.split(';')
    // Шукаємо куки з вказаним ім'ям
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim() // Видаляємо зайві пробіли
        // Перевіряємо, чи починається поточне кукі з шуканого імені
        if (cookie.startsWith(cookieName + '=')) {
            // Якщо так, повертаємо значення кукі
            return cookie.substring(cookieName.length + 1) // +1 для пропуску символу
            "="
        }
    }
    // Якщо кукі з вказаним іменем не знайдено, повертаємо порожній рядок або можна повернути null
    return ''
}

loadCartFromCookies()
    let cartCookie = getCookieValue('cart');
    if (cartCookie && cartCookie !== '') {
        this.items = JSON.parse(cartCookie);
        
    }


let cart = new ShopingCart()

function addToCart(event) {
    let productData = event.target.getAttribute("data-product")
    let product = JSON.parse(productData)
    cart.addItem(product)
    console.log(cart)

}


class ShopingCart {
    constructor() {
        this.items = {}
        this.loadCartFromCookies()
        console.log(this.items)
    }
    addItem(product) {
        if (this.items[product.title]) {
            this.items[product.title].quantity += 1
        } else {
            this.items[product.title] = product
            this.items[product.title].quantity = 1
        }
        this.saveCartToCookies()


    }
    saveCartToCookies() {
        let cartJSON = JSON.stringify(this.items);
        document.cookie = `cart=${cartJSON}; max-age=${60 * 60 * 24 * 7}; path=/`;
    }

}




// Викликаємо асинхронну функцію та очікуємо на отримання продуктів
getProducts().then(function (products) {

    let productsList = document.querySelector('.menu-list')
    productsList.innerHTML = ""
    if (productsList) {
        products.forEach(function (product) {
            // Відображаємо товари на сторінці
            productsList.innerHTML += getCardHTML(product)
        })
    }
    // Отримуємо всі кнопки "Купити" на сторінці
    let buyButtons = document.querySelectorAll('.menu-list .order-btn');
    // Навішуємо обробник подій на кожну кнопку "Купити"
    if (buyButtons) {
        buyButtons.forEach(function (button) {
            button.addEventListener('click', addToCart)
        });
    }
})


let cart_list=document.querySelector('.cart')
if (cart_list){
    cart_list.innerHTML=''
    for (let title in cart.items){
        cart_list.innerHTML+= getCardHTML(cart.items[title])
    }
}