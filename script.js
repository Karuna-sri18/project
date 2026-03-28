const API = "http://localhost:5000";

// REGISTER
async function register() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let res = await fetch(API + "/register", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ email, password })
    });

    let data = await res.json();
    alert(data.message);
}

// LOGIN
async function login() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let res = await fetch(API + "/login", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ email, password })
    });

    let data = await res.json();

    if (data.pending) {
        alert("Waiting for admin approval");
    }
    else if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "home.html";
    }
    else {
        alert(data.error);
    }
}
// LOGIN
async function login() {
    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;

    let res = await fetch(API + "/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, pass})
    });

    let data = await res.json();

    if (data.success) {

        localStorage.setItem("user", email);

        if (email === "admin@gmail.com") {
            window.location.href = "admin.html";
        } else {
            window.location.href = "home.html";
        }

    } else {
        alert("Invalid login ❌");
    }
}
emailjs.init("MjyoFIHXzIZROBg1w");

// ================= REGISTER =================
function register() {
    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;

    localStorage.setItem("email", email);
    localStorage.setItem("pass", pass);

    alert("Registered ✅");
    window.location.href = "login.html";
}

// ================= LOGIN =================
function login() {
    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;

    let savedEmail = localStorage.getItem("email");
    let savedPass = localStorage.getItem("pass");

    if (email === savedEmail && pass === savedPass) {

        emailjs.send("service_lu5dsob", "template_4xizy1s", {
            to_email: email,
            message: "⚠ Someone is trying to login to your account"
        });

        localStorage.setItem("currentUser", email);
        window.location.href = "method.html";

    } else {
        alert("Invalid ❌");
    }
}

// ================= METHOD =================
function sendMethod() {

    let method = document.getElementById("method").value;
    let email = localStorage.getItem("currentUser");

    document.getElementById("otpDiv").style.display = "none";
    document.getElementById("magicDiv").style.display = "none";
    document.getElementById("mfaDiv").style.display = "none";

    // OTP
    if (method === "otp") {
        let otp = Math.floor(1000 + Math.random() * 9000);
        localStorage.setItem("otp", otp);

        emailjs.send("service_lu5dsob", "template_4xizy1s", {
            to_email: email,
            message: "Your OTP: " + otp
        });

        document.getElementById("otpDiv").style.display = "block";
    }

    // MAGIC
    if (method === "magic") {
        let token = Math.random().toString(36).substring(2);
        localStorage.setItem("magicToken", token);

        emailjs.send("service_lu5dsob", "template_4xizy1s", {
            to_email: email,
            message: "Magic Token: " + token
        });

        document.getElementById("magicDiv").style.display = "block";
    }

    // MFA
    if (method === "mfa") {
        let otp = Math.floor(1000 + Math.random() * 9000);
        localStorage.setItem("otp", otp);

        emailjs.send("service_lu5dsob", "template_4xizy1s", {
            to_email: email,
            message: "MFA OTP: " + otp
        });

        document.getElementById("mfaDiv").style.display = "block";
    }
}

// ================= VERIFY OTP =================
function verifyOtp() {
    let userOtp = document.getElementById("otp").value;
    let realOtp = localStorage.getItem("otp");

    if (userOtp == realOtp) {
        alert("Login Success ✅");
        window.location.href = "app.html";
    } else {
        alert("Wrong OTP ❌");
    }
}

// ================= VERIFY MAGIC =================
function verifyMagic() {
    let userToken = document.getElementById("magicInput").value;
    let realToken = localStorage.getItem("magicToken");

    if (userToken === realToken) {
        alert("Magic Login Success ✅");
        window.location.href = "app.html";
    } else {
        alert("Invalid Token ❌");
    }
}

// ================= VERIFY MFA =================
function verifyMFA() {
    let password = document.getElementById("mfaPass").value;
    let otp = document.getElementById("mfaOtp").value;

    let realPass = localStorage.getItem("pass");
    let realOtp = localStorage.getItem("otp");

    if (password === realPass && otp == realOtp) {
        alert("MFA Success ✅");
        window.location.href = "app.html";
    } else {
        alert("MFA Failed ❌");
    }
}

// ================= SELECT APP =================
function openApp() {
    let app = document.getElementById("app").value;
    localStorage.setItem("selectedApp", app);
    window.location.href = "home.html";
}

// ================= ADD TO CART =================
// script.js

// Add product to cart
function addToCart(name, price, img) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if item already exists to increase quantity
    const existing = cart.find(item => item.name === name);
    if(existing){
        existing.quantity += 1;
    } else {
        cart.push({name, price, img, quantity:1});
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(name + " added to cart!");
    displayCart(); // optional if you want live update on cart page
}

// Add product to wishlist
function addToWishlist(name, price, img) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist.push({name, price, img});
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    alert(name + " added to wishlist!");
}

// Display products on cart page
function displayCart() {
    const cartContainer = document.getElementById('cartList');
    if(!cartContainer) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartContainer.innerHTML = "";

    if(cart.length === 0){
        cartContainer.innerHTML = "<p style='text-align:center;'>Your cart is empty</p>";
        document.getElementById('totalPrice').innerText = "";
        return;
    }

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${item.img}" style="width:100px;height:100px;">
            <h3>${item.name}</h3>
            <p>₹${item.price} x ${item.quantity}</p>
            <p>Subtotal: ₹${item.price * item.quantity}</p>
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartContainer.appendChild(card);
    });

    document.getElementById('totalPrice').innerText = "Total: ₹" + total;
}

// Remove item from cart
function removeFromCart(name){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Search products
function searchProduct() {
    const input = document.getElementById('search').value.toLowerCase();
    const products = document.querySelectorAll('.container .card');

    products.forEach(product => {
        const name = product.querySelector('h3').innerText.toLowerCase();
        if(name.includes(input)){
            product.style.display = '';
        } else {
            product.style.display = 'none';
        }
    });
}

// Call displayCart on cart page
document.addEventListener('DOMContentLoaded', displayCart);
// ================= ADD TO WISHLIST =================
// function addToWishlist(name, price, img) {

//     let wish = JSON.parse(localStorage.getItem("wishlist")) || [];

//     wish.push({ name, price, img });

//     localStorage.setItem("wishlist", JSON.stringify(wish));
//     alert("Added to Wishlist ❤️");
// }

// ================= LOAD CART =================
function loadCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("cartItems");

    let total = 0;
    container.innerHTML = "";

    cart.forEach((item, index) => {

        total += item.price * item.qty;

        container.innerHTML += `
        <div class="card">
            <img src="${item.img}">
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>

            <div class="qty">
                <button onclick="changeQty(${index}, -1)">-</button>
                <span>${item.qty}</span>
                <button onclick="changeQty(${index}, 1)">+</button>
            </div>

            <button onclick="removeItem(${index})" style="background:red;color:white;">Remove</button>
        </div>
        `;
    });

    document.getElementById("total").innerText = "Total: ₹" + total;
}

// ================= CHANGE QTY =================
function changeQty(index, change) {

    let cart = JSON.parse(localStorage.getItem("cart"));

    cart[index].qty += change;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// ================= REMOVE ITEM =================
function removeItem(index) {

    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// ================= LOAD WISHLIST =================
function loadWishlist() {

    let wish = JSON.parse(localStorage.getItem("wishlist")) || [];
    let container = document.getElementById("wishItems");

    container.innerHTML = "";

    wish.forEach((item, index) => {

        container.innerHTML += `
        <div class="card">
            <img src="${item.img}">
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>

            <button onclick="moveToCart(${index})" class="cart">Move to Cart</button>
        </div>
        `;
    });
}

// ================= MOVE TO CART =================
function moveToCart(index) {

    let wish = JSON.parse(localStorage.getItem("wishlist"));
    let item = wish[index];

    addToCart(item.name, item.price, item.img);

    wish.splice(index, 1);
    localStorage.setItem("wishlist", JSON.stringify(wish));

    loadWishlist();
}

// ================= PAYMENT =================
function payNow() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Cart is empty ❌");
        return;
    }

    alert("Order Placed Successfully 🎉");

    localStorage.removeItem("cart");

    window.location.href = "home.html";
}

function searchProduct() {
    let input = document.getElementById("search").value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let text = card.innerText.toLowerCase();

        card.style.display = text.includes(input) ? "inline-block" : "none";
    });
}

function saveOrder(cart) {

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.push({
        items: cart,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("orders", JSON.stringify(orders));
}

function downloadInvoice() {

    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let y = 10;

    doc.text("Invoice", 10, y);
    y += 10;

    cart.forEach(item => {
        doc.text(`${item.name} x ${item.qty}`, 10, y);
        y += 10;
    });

    doc.save("invoice.pdf");
}
downloadInvoice();
