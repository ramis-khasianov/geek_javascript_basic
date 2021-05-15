const catalog = {
    containerElement: null,
    cart: null,
    items: [
        {
            id: 1,
            image: "img/course02.jpeg",
            title: "Что такое сервисный дизайн", // Типа магазин видеокурсов
            description: "",
            type: "Course",
            price: 1300
        },
        {
            id: 2,
            image: "img/course01.jpeg",
            title: "Проектирование мобильного приложения",
            description: "",
            type: "Program",
            price: 10000
        },
        {
            id: 3,
            image: "img/course03.jpeg",
            title: "Управление изменениями",
            description: "",
            type: "Course",
            price: 1800
        },
        {
            id: 4,
            image: "img/course04.jpg",
            title: "Интернет вещей: Введение",
            description: "",
            type: "Course",
            price: 1600
        },
        {
            id: 5,
            image: "img/course05.jpg",
            title: "UX и UI для разрабочиков",
            description: "",
            type: "Course",
            price: 1600
        },
        {
            id: 6,
            image: "img/course06.jpg",
            title: "Создание дизайн системы для продуктов",
            description: "",
            type: "Course",
            price: 11000
        }
    ],

    init(containerElementId, cart){
        this.containerElement = document.getElementById(containerElementId)
        this.cart = cart
        this.renderCatalog()
        this.addEventHandlers()
    },

    renderCatalog() {
        this.containerElement.innerHTML = ''
        if (this.items.length > 0) {
            this.items.forEach(item => {
                this.containerElement.insertAdjacentHTML('beforeend', this.renderCatalogItem(item))
            })
        } else {
            this.renderEmpty()
        }

    },

    renderCatalogItem(item) {
        return `<div class="catalog-item-card">
            <img src="${item.image}" alt="${item.title}" class="catalog-item-image">
            <p class="general-heading-mini">${item.title}</p>
            <div class="catalog-item-price-and-buy">
                <p class="catalog-item-price">${item.price} руб.</p>
                <a class="catalog-item-buy-button" data-item_id="${item.id}">В корзину</a>
            </div>
            
        </div>`
    },

    renderEmpty() {
        this.containerElement.innerHTML = ''
        this.containerElement.innerHTML = `<div class="catalog-item-card">
                   <p>По вашему запросу ничего не найдено...</p>
            </div>`
    },

    addToCart(event) {
        if (!event.target.classList.contains('catalog-item-buy-button')) return; // Сначала навешал на каждую кнопку ивент листнеров, но ваш вариант больше понравился)
        const itemId = +event.target.dataset.item_id;
        console.log(event.target.dataset.item_id)
        const itemToAdd = this.items.find((item) => item.id === itemId);
        this.cart.addItemToCart(itemToAdd);
    },

    addEventHandlers() {
        this.containerElement.addEventListener('click', event => this.addToCart(event));
    }
}


const cart = {

    containerElement: null,
    items: [
        {
            id: 1,
            image: "img/course02.jpeg",
            title: "Что такое сервисный дизайн", // Типа магазин видеокурсов
            description: "",
            type: "Course",
            price: 1300
        }
    ],

    init(containerElementId){
        this.containerElement = document.getElementById(containerElementId)
        this.renderCart()
        this.addEventHandlers()
    },

    countTotalPrice() {
        return this.items.reduce((totalPrice, basketItem) => totalPrice + basketItem.price, 0);
    },

    renderCart() {
        this.containerElement.innerHTML = ''

        if (this.items.length > 0) {
            const totalPrice = this.countTotalPrice()
            const summaryRow = `<div class="cart-summary-row">В корзине ${this.items.length} товаров на сумму ${totalPrice} рублей.</div>`
            this.containerElement.insertAdjacentHTML('afterbegin', summaryRow)
            this.items.forEach(item => {
                this.containerElement.insertAdjacentHTML('beforeend', this.renderCartItem(item))
            })
        } else {
            this.renderEmpty()
        }
    },

    renderCartItem(item) {
        return `<div class="cart-item-row">
                <img src="${item.image}" class="cart-item-image" alt="">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">${item.price}</div>
                <a class="cart-item-remove" data-item_id="${item.id}">
                    <div class="cart-item-remove-image"></div>
                </a>
            </div>`
    },

    addItemToCart(item) {

        const isInCart = this.checkIfAlreadyInCart(item)

        if (!isInCart) {
            this.items.push(item)
        }
        this.renderCart();
    },

    checkIfAlreadyInCart(item) {
        const itemInCart = this.items.find(({id}) => item.id === id);
        console.log(itemInCart)
        return !!itemInCart;
    },

    addEventHandlers() {
        this.containerElement.addEventListener('click', event => this.removeFromCart(event));
    },

    removeFromCart(event) {
        console.log(event.target)
        if (!event.target.classList.contains('cart-item-remove-image')) return;
        const itemId = +event.target.dataset.item_id;
        console.log(event.target)
        this.items.splice(this.items.findIndex(item => item.id === itemId), 1)
        this.renderCart()
    },

    renderEmpty() {
        this.containerElement.innerHTML = ''
        this.containerElement.innerHTML = `<div class="cart-summary-row">
                   <p>Корзина пуста</p>
            </div>`
    }
}

catalog.init("catalog", cart)
cart.init("cart")