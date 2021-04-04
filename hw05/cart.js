const cart = {

    items: [
        {
            id: 1,
            image: 'img/course02.jpeg',
            title: "Что такое сервисный дизайн", // Типа магазин видеокурсов
            type: "Course",
            price: 1300
        },
        {
            id: 2,
            image: 'img/course01.jpeg',
            title: "Проектирование мобильного приложения",
            type: "Program",
            price: 10000
        },
        {
            id: 3,
            image: 'img/course03.jpeg',
            title: "Управление изменениями",
            type: "Course",
            price: 1800
        }
    ],


    init(containerElementId){
        this.containerElement = document.getElementById(containerElementId)
        this.showCartItems()
    },

    countTotalPrice() {
        return this.items.reduce((totalPrice, basketItem) => totalPrice + basketItem.price, 0);
    },

    removeItem(id) {
        console.log('Removing' + id.toString())
        this.items.splice(this.items.findIndex(item => item.id === id), 1)
        this.showCartItems()
    },

    showCartSummary() {
        let totalPrice = this.countTotalPrice()
        const cartSummaryRow = document.createElement('div')
        cartSummaryRow.classList.add('cart-summary-row')
        cartSummaryRow.innerText = 'В корзине ' + this.items.length.toString() + ' товаров на сумму ' + totalPrice + ' рублей.'
        this.containerElement.appendChild(cartSummaryRow)
    },

    showCartItems() {
        this.containerElement.innerHTML = ''
        if (this.items.length > 0) {
            for (let item of this.items) {
                const itemRow = document.createElement('div')
                itemRow.classList.add('cart-item-row')
                itemRow.setAttribute('id', item.id)
                this.containerElement.appendChild(itemRow)

                // Картинка
                const itemImage = document.createElement('img')
                itemImage.setAttribute('src', item.image)
                itemImage.classList.add('cart-item-image')
                itemRow.appendChild(itemImage)
                // Название
                const itemTitle = document.createElement('div')
                itemTitle.classList.add('cart-item-title')
                itemTitle.innerText = item.title
                itemRow.appendChild(itemTitle)
                // Цена
                const itemPrice = document.createElement('div')
                itemPrice.classList.add('cart-item-price')
                itemPrice.innerText = item.price
                itemRow.appendChild(itemPrice)
                // Значок корзинки
                const removeBtn = document.createElement('a')
                removeBtn.setAttribute('id', 'item' + item.id.toString())
                removeBtn.classList.add('cart-item-remove')
                const removeBtnIcon = document.createElement('div')
                // removeBtnIcon.setAttribute('src', 'img/trash.svg')
                removeBtnIcon.classList.add('cart-item-remove-image')
                removeBtn.appendChild(removeBtnIcon)
                itemRow.appendChild(removeBtn)
                removeBtn.addEventListener('click', () => {this.removeItem(item.id)})
            }

            this.showCartSummary()
        } else {
            this.showEmptyCart()
        }
    },

    showEmptyCart() {
        const itemRow = document.createElement('div')
        itemRow.classList.add('cart-summary-row')
        itemRow.innerText = 'Корзина пуста'
        this.containerElement.appendChild(itemRow)
    }
}

cart.init("cart")