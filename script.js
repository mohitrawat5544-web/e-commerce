const products = [
    {
        id: 1,
        name: "Classic T-Shirt",
        price: 599,
        category: "Clothes",
        image: "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?q=80&w=800"
    },
    {
        id: 2,
        name: "Running Shoes",
        price: 1499,
        category: "Shoes",
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800"
    },
    {
        id: 3,
        name: "Smart Watch",
        price: 2499,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },
    {
        id: 4,
        name: "Hoodie",
        price: 999,
        category: "Clothes",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7"
    },
    {
        id: 5,
        name: "Headphones",
        price: 1999,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
        id: 6,
        name: "Casual Sneakers",
        price: 1799,
        category: "Shoes",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772"
    }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const container = document.getElementById("productContainer");

function displayProducts(list) {

    container.innerHTML = "";

    list.forEach(product => {

        container.innerHTML += `
            <div class="product">

                <img src="${product.image}" alt="${product.name}">

                <h3>${product.name}</h3>

                <p>₹${product.price}</p>

                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>

            </div>
        `;
    });
}

function addToCart(id) {

    const product = products.find(p => p.id === id);

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();

    alert("Product added to cart!");
}

function updateCart() {

    document.getElementById("cartCount").innerText = cart.length;

    const cartItems = document.getElementById("cartItems");

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price;

        cartItems.innerHTML += `
            <div class="cart-item">

                <span>
                    ${item.name}<br>
                    ₹${item.price}
                </span>

                <button class="remove"
                    onclick="removeFromCart(${index})">
                    Remove
                </button>

            </div>
        `;
    });

    document.getElementById("cartTotal").innerText = total;
}

function removeFromCart(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();
}

function filterProducts(category) {

    if (category === "All") {
        displayProducts(products);
    } else {

        const filtered = products.filter(
            product => product.category === category
        );

        displayProducts(filtered);
    }
}

document.getElementById("search").addEventListener("input", function () {

    const searchText = this.value.toLowerCase();

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchText)
    );

    displayProducts(filtered);
});

document.getElementById("cartBtn").addEventListener("click", function () {

    document.getElementById("cartBox").classList.add("active");

});

function closeCart() {

    document.getElementById("cartBox").classList.remove("active");

}

function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Order placed successfully!");

    cart = [];

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();
}

displayProducts(products);
updateCart();