/*********************************
 * CART CONFIG
 *********************************/
const CART_KEY = "ANT_CART";
const ZALO_PHONE = "840909886861"; // 👈 ĐỔI SỐ ZALO CỦA BẠN (84xxx)

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

/*********************************
 * ADD (GỘP SẢN PHẨM TRÙNG)
 *********************************/
function addToCart(item) {
  const cart = getCart();

  const found = cart.find(p =>
    p.title === item.title &&
    p.box === item.box &&
    p.price === item.price
  );

  if (found) {
    found.qty += item.qty;
    found.total += item.total;
  } else {
    cart.push(item);
  }

  saveCart(cart);
  showCartToast();
}

/*********************************
 * TOAST
 *********************************/
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
  const count = getCart().reduce((s, i) => s + i.qty, 0);
  const el = document.querySelector(".cart-count");
  if (el) el.textContent = count;
}

/*********************************
 * UI INIT
 *********************************/
document.addEventListener("DOMContentLoaded", () => {

  /* FLOAT BUTTON */
  const cartBtn = document.createElement("div");
  cartBtn.className = "cart-float";
  cartBtn.innerHTML = `
    🛒
    <span class="cart-count">0</span>
    <span class="cart-toast">Đã thêm</span>
  `;
  document.body.appendChild(cartBtn);

  /* POPUP */
  const popup = document.createElement("div");
  popup.className = "cart-popup";
  popup.innerHTML = `
    <div class="cart-box">
      <h3>🛒 Giỏ hàng</h3>
      <div class="cart-list"></div>
      <div class="cart-total"></div>
      <div class="cart-actions">
        <button class="cart-buy">Xác nhận mua hàng</button>
        <button class="cart-clear">Xóa tất cả</button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);

  updateCartCount();

  cartBtn.onclick = () => {
    popup.classList.add("active");
    renderCart();
  };

  popup.onclick = e => {
    if (e.target === popup) popup.classList.remove("active");
  };


popup.querySelector(".cart-clear").onclick = () => {
  localStorage.removeItem(CART_KEY);
  updateCartCount();
  popup.classList.remove("active"); // 👈 đóng popup
};

  popup.querySelector(".cart-buy").onclick = showCheckout;
});

/*********************************
 * RENDER CART
 *********************************/
function renderCart() {
  const cart = getCart();
  const list = document.querySelector(".cart-list");
  const totalEl = document.querySelector(".cart-total");

  list.innerHTML = "";
  let total = 0;

  if (!cart.length) {
    list.innerHTML = "<p style='opacity:.6'>Giỏ hàng trống</p>";
    totalEl.innerHTML = "";
    return;
  }

  cart.forEach((item, index) => {
    total += item.total;

    list.insertAdjacentHTML("beforeend", `
      <div class="cart-item">
        <div>
          <strong>${item.title}</strong><br>
          ${item.box}kg × 
          <button onclick="changeQty(${index},-1)">−</button>
          ${item.qty}
          <button onclick="changeQty(${index},1)">+</button>
        </div>
        <div>
          ${item.total.toLocaleString("vi-VN")}₫
          <button class="remove" onclick="removeItem(${index})">❌</button>
        </div>
      </div>
    `);
  });

  totalEl.innerHTML = `Tổng: ${total.toLocaleString("vi-VN")}₫`;
}

/*********************************
 * QTY + REMOVE
 *********************************/
function changeQty(index, delta) {
  const cart = getCart();
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  else cart[index].total = cart[index].qty * cart[index].price * cart[index].box;
  saveCart(cart);
  renderCart();
}

function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

/*********************************
 * CHECKOUT
 *********************************/
function showCheckout() {
  const cart = getCart();
  if (!cart.length) return;

  const total = cart.reduce((s, i) => s + i.total, 0);
  const popup = document.querySelector(".cart-popup");

  popup.innerHTML = `
    <div class="cart-box checkout-box">
      <h3>📝 Thông tin mua hàng</h3>

      <div class="checkout-list">
        ${cart.map(i => `
          <div class="checkout-item">
            <div>
              <strong>${i.title}</strong><br>
              ${i.qty} × ${i.box}kg
            </div>
            <div class="price">
              ${i.total.toLocaleString("vi-VN")}₫
            </div>
          </div>
        `).join("")}
      </div>

      <div class="checkout-total">
        Tổng cộng: <strong>${total.toLocaleString("vi-VN")}₫</strong>
      </div>

      <div class="checkout-form">
        <input id="cus-name" placeholder="👤 Họ và tên">
        <input id="cus-phone" placeholder="📞 Số điện thoại">
        <textarea id="cus-address" placeholder="📍 Địa chỉ giao hàng"></textarea>
      </div>

      <div class="cart-actions">
        <button class="cart-buy" onclick="sendZalo()">Xác nhận</button>
        <button class="cart-clear" onclick="closeCheckout()">Hủy</button>
      </div>
    </div>
  `;
}

function closeCheckout() {
  document.querySelector(".cart-popup").classList.remove("active");
}

function sendZalo() {
  const name = document.getElementById("cus-name").value;
  const phone = document.getElementById("cus-phone").value;
  const address = document.getElementById("cus-address").value;

  const cart = getCart();
  let msg = `🛒 ĐƠN HÀNG\n`;
  cart.forEach(i => {
    msg += `- ${i.title}: ${i.qty} × ${i.box}kg = ${i.total}₫\n`;
  });
  msg += `\n👤 ${name}\n📞 ${phone}\n🏠 ${address}`;

  window.open(`https://zalo.me/${ZALO_PHONE}?text=${encodeURIComponent(msg)}`);
}

