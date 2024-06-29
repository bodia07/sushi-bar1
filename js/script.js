async function getProducts() {
    // Виконуємо запит до файлу "store_db.json" та очікуємо на відповідь
    const response = await fetch("https://api.zerosheets.com/v1/xom", {
        method: "GET",
        headers: {
            Authorization: "Bearer GFGzEyUV4A9tJP2nNWa8GrhHj9l471VK"
        }
    });
    // Очікуємо на отримання та розпакування JSON-даних з відповіді
    let products = await response.json()
    // Повертаємо отримані продукти
    return products
}
function getCardHTML(item){
    return `<div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="img/${item.image}" class="img-fluid  h-100" alt="${item.title}">
                  </div>
                  <div class="col-md-6">
                    <div class="card-body">
                      <h5 class="card-title">${item.title}</h5>
                      <p class="card-text">${item.description}</p>
                      <h6>${item.price} hrn.</h6>
                      <a class="fancy" href="#">
                        <span class="top-key"></span>
                        <span class="text">order</span>
                        <span class="bottom-key-1"></span>
                        <span class="bottom-key-2"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>`
}