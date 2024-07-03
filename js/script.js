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
    // if (buyButtons) {
    //     buyButtons.forEach(function (button) {
    //         button.addEventListener('click', addToCart)
    //     });
    // }
})
