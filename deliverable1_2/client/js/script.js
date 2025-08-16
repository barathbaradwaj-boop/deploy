// ===== Add to Cart =====
function addToCart(itemName) {
  alert(`${itemName} has been added to your cart.`);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(itemName);
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ===== Contact Form =====
function validateContactForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return false;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
  if (!email.match(emailPattern)) {
    alert("Please enter a valid email.");
    return false;
  }

  alert("Message sent! Thank you.");
  return true;
}

// ===== Register User =====
function registerUser() {
  const name = document.getElementById("reg-name").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value;

  if (!name || !email || !password) {
    alert("All fields are required.");
    return false;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters.");
    return false;
  }

  const user = { name, email, password };
  localStorage.setItem("user", JSON.stringify(user));
  alert("Registration successful! Redirecting to login...");
  window.location.href = "login.html";
  return false;
}

// ===== Login User =====
function loginUser() {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (storedUser && email === storedUser.email && password === storedUser.password) {
    localStorage.setItem("isLoggedIn", "true");
    alert("Login successful! Redirecting to home...");
    window.location.href = "index.html";
  } else {
    alert("Invalid email or password.");
  }
  return false;
}

// ===== Display Profile in Navbar =====
function showUserProfile() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (isLoggedIn === "true" && storedUser?.name) {
    const profileHTML = `
      <div class="user-profile">
        <img src="assests/image/user-avatar.png" alt="Profile" class="profile-pic">
        <span>Hello, ${storedUser.name}</span>
        <button onclick="logoutUser()">Logout</button>
      </div>
    `;
    const profileArea = document.getElementById("profile-area");
    if (profileArea) profileArea.innerHTML = profileHTML;
  }

  loadHomepageProducts();
}

// ===== Logout User =====
function logoutUser() {
  localStorage.removeItem("isLoggedIn");
  alert("You have been logged out.");
  window.location.href = "index.html";
}

// ===== Admin Authentication Check =====
function checkAdminAuth() {
  const isAdmin = localStorage.getItem("isAdmin");
  const loginForm = document.getElementById("admin-login");
  const dashboard = document.getElementById("admin-dashboard");
  const adminHeader = document.getElementById("admin-header");

  if (isAdmin === "true") {
    loginForm.style.display = "none";
    dashboard.style.display = "block";
    if (adminHeader) adminHeader.style.display = "flex";
    initAdminPanel();
  } else {
    loginForm.style.display = "block";
    dashboard.style.display = "none";
    if (adminHeader) adminHeader.style.display = "none";
  }
}

// ===== Admin Login =====
function adminLogin() {
  const username = document.getElementById("admin-username").value.trim();
  const password = document.getElementById("admin-password").value;

  if (username === "admin" && password === "admin123") {
    alert("Welcome Admin!");
    localStorage.setItem("isAdmin", "true");
    checkAdminAuth();
  } else {
    alert("Invalid admin credentials.");
  }
  return false;
}

// ===== Admin Logout =====
function logoutAdmin() {
  localStorage.removeItem("isAdmin");
  alert("You have been logged out.");
  window.location.href = "index.html";
}

// ===== Product Add (Image Upload) =====
function addProduct() {
  const name = document.getElementById("product-name").value;
  const price = document.getElementById("product-price").value;
  const fileInput = document.getElementById("product-image");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select an image.");
    return false;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const image = e.target.result;
    const products = JSON.parse(localStorage.getItem("adminProducts")) || [];
    products.push({ name, price, image });
    localStorage.setItem("adminProducts", JSON.stringify(products));

    alert("Product added!");
    document.getElementById("add-product-form").reset();
    loadProducts();
    updateDashboardCounts();
  };

  reader.readAsDataURL(file);
  return false;
}

// ===== Load Products (Admin View) =====
function loadProducts() {
  const productList = document.getElementById("product-list-admin");
  if (!productList) return;

  productList.innerHTML = "";
  const products = JSON.parse(localStorage.getItem("adminProducts")) || [];

  products.forEach((product, index) => {
    const item = document.createElement("div");
    item.className = "admin-product-item";

    item.innerHTML = `
      <img src="${product.image}" class="admin-thumb">

      <div style="flex:1;">
        <p><strong>Product Name:</strong> ${product.name}</p>
        <p><strong>Price:</strong> ₹${product.price}</p>
        <input type="text" value="${product.name}" onchange="editProduct(${index}, 'name', this.value)">
        <input type="text" value="${product.price}" onchange="editProduct(${index}, 'price', this.value)">
      </div>

      <button onclick="deleteProduct(${index})">Delete</button>
    `;

    productList.appendChild(item);
  });
}

// ===== Edit Product =====
function editProduct(index, field, value) {
  const products = JSON.parse(localStorage.getItem("adminProducts")) || [];
  products[index][field] = value;
  localStorage.setItem("adminProducts", JSON.stringify(products));
}

// ===== Delete Product =====
function deleteProduct(index) {
  const products = JSON.parse(localStorage.getItem("adminProducts")) || [];
  products.splice(index, 1);
  localStorage.setItem("adminProducts", JSON.stringify(products));
  loadProducts();
  updateDashboardCounts();
}

// ===== Load Products on Home Page =====
function loadHomepageProducts() {
  const homepageProductList = document.getElementById("product-list");
  if (!homepageProductList) return;

  homepageProductList.innerHTML = "";

  const products = JSON.parse(localStorage.getItem("adminProducts")) || [];

  if (products.length === 0) {
    homepageProductList.innerHTML = "<p>No products available yet.</p>";
    return;
  }

  products.forEach(product => {
    const item = document.createElement("div");
    item.className = "product";
    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart('${product.name}')">Add to Cart</button>
    `;
    homepageProductList.appendChild(item);
  });
}

// ===== Admin Panel Initializer =====
function initAdminPanel() {
  loadProducts();
  updateDashboardCounts();
  loadOrders?.();
  loadCustomers?.();
  drawChart?.();
}

// ===== Update Admin Dashboard Counts =====
function updateDashboardCounts() {
  const products = JSON.parse(localStorage.getItem("adminProducts")) || [];
  document.getElementById("product-count").textContent = products.length || 0;
  document.getElementById("order-count").textContent = 3; // demo
  document.getElementById("customer-count").textContent = 1; // demo
  document.getElementById("sales-total").textContent = 5497; // demo
}
