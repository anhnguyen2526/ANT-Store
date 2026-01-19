/*********************************
 * CART CONFIG
 *********************************/
const CART_KEY = "ANT_CART";

/*********************************
 * CART DATA
 *********************************/
function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(item) {
  const cart = getCart();
  cart.push(item);
  saveCart(cart);
  showCartToast();
}

function showCartToast() {
  const btn = document.querySelector(".cart-float");
  const toast = btn.querySelector(".cart-toast");

  btn.classList.add("pop");
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
    btn.classList.remove("pop");
  }, 900);
}
    
/*********************************
 * COUNT
 *********************************/
function updateCartCount() {
  const count = getCart().length;
  const el = document.querySelector(".cart-count");
  if (el) el.textContent = count;
}

/*********************************
 * UI INIT
 *********************************/
document.addEventListener("DOMContentLoaded", () => {

  /* ===== FLOAT BUTTON ===== */
  const cartBtn = document.createElement("div");
  cartBtn.className = "cart-float";
 cartBtn.innerHTML = `
  🛒
  <span class="cart-count">0</span>
  <span class="cart-toast">+1 vào giỏ</span>
`;
  document.body.appendChild(cartBtn);

  /* ===== POPUP ===== */
  const popup = document.createElement("div");
  popup.className = "cart-popup";
  popup.innerHTML = `
    <div class="cart-box">
      <h3>🛒 Giỏ hàng</h3>
      <div class="cart-list"></div>
      <div class="cart-total"></div>
      <div class="cart-actions">
        <button class="cart-buy">Thêm vào giỏ</button>
        <button class="cart-clear">Xóa</button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);

  updateCartCount();

  /* ===== OPEN ===== */
  cartBtn.addEventListener("click", () => {
    popup.classList.add("active");
    renderCart();
  });

  /* ===== CLOSE ===== */
  popup.addEventListener("click", e => {
    if (e.target === popup) popup.classList.remove("active");
  });

  /* ===== CLEAR ===== */
  popup.querySelector(".cart-clear").addEventListener("click", () => {
    localStorage.removeItem(CART_KEY);
    renderCart();
    updateCartCount();
  });

});

/*********************************
 * RENDER
 *********************************/
function renderCart() {
  const cart = getCart();
  const list = document.querySelector(".cart-list");
  const totalEl = document.querySelector(".cart-total");

  list.innerHTML = "";
  let total = 0;

  if (!cart.length) {
    list.innerHTML = "<p style='text-align:center;opacity:.6'>Giỏ hàng trống</p>";
    totalEl.innerHTML = "";
    return;
  }

  cart.forEach(item => {
    total += item.total;
    list.insertAdjacentHTML(
      "beforeend",
      `
      <div class="cart-item">
        <span>${item.title} (${item.box}kg × ${item.qty})</span>
        <strong>${item.total.toLocaleString("vi-VN")}₫</strong>
      </div>
      `
    );
  });

  totalEl.innerHTML = `<strong>Tổng: ${total.toLocaleString("vi-VN")}₫</strong>`;
}
