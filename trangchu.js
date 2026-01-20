/*********************************
 * DOM READY
 *********************************/
document.addEventListener("DOMContentLoaded", () => {

  /*********************************
   * TYPEWRITER
   *********************************/
  const typewriters = document.querySelectorAll(".typewriter");
  typewriters.forEach(el => {
    el.addEventListener("animationend", e => {
      if (e.animationName === "typing") {
        el.classList.add("done");
      }
    });
  });

  /*********************************
   * BIẾN DOM
   *********************************/
  const cards = document.querySelectorAll(".card");
  const cardWrapper = document.querySelector(".card-wrapper");

  const detail = document.getElementById("product-detail");
  const title = document.getElementById("detail-title");
  const desc = document.getElementById("detail-desc");
  const gallery = document.querySelector(".gallery");

  const popup = document.getElementById("popup");
  const popupContent = popup.querySelector(".popup-content");
  const closePopupBtn = popup.querySelector(".close");

  const fruitBox = document.querySelector(".fruit-box");
  const fsBox = document.querySelector(".fishsauce-box");

  if (!cards.length || !detail) return;

  /*********************************
   * DATA SẢN PHẨM
   *********************************/
  const data = [
    {
      title: "Dâu Mộc Châu",
      desc: `
<strong>🍓 Dâu tươi Mộc Châu - Sơn La</strong><br>
🌿 Trồng tại cao nguyên mát lành<br>
🧺 Thu hoạch trong ngày – không bảo quản<br>
✈️ Ship toàn quốc
`,
      media: [
        "img/dau1.jpg","img/dau2.jpg","img/dau3.jpg",
        "img/dau4.jpg","img/dau5.jpg","img/dau6.jpg",
        "img/dau7.jpg","img/dau8.jpg","img/dau9.jpg",
        "video/dau1.mp4"
      ]
    },
    {
      title: "Cafe chất",
      desc: "Cafe rang mộc – đậm vị – không pha trộn.",
      media: ["img/cafe1.jpg", "img/cafe2.jpg"]
    },
    {
      title: "Hạt điều",
      desc: "Hạt điều rang muối – giòn béo tự nhiên.",
      media: ["img/dieu1.jpg", "video/dieu.mp4"]
    },
    {
      title: "Mật ong",
      desc: "Mật ong nguyên chất.",
      media: ["img/dieu1.jpg"]
    },
    {
      title: "Gạo ST25",
      desc: "Gạo ST25 – hạt ngọc Việt.",
      media: ["img/dieu1.jpg"]
    },
    {
      title: "Nước mắm 584",
      buyType: "fishsauce",
      options: {
        "12": { bottle: "5 lít",  price: 90000 },
        "25": { bottle: "500ml", price: 35000 },
        "30": { bottle: "500ml", price: 60000 },
        "40": { bottle: "500ml", price: 80000 },
        "60": { bottle: "200ml", price: 120000 }
      },
      desc: `
<strong>🍾 Nước mắm 584 - Nha Trang</strong><br>
Nước mắm 584 Nha Trang được chế biến từ nguyên liệu cá cơm ở vùng biển Nha Trang. Cá cơm được lựa chọn kỹ nhằm đảm bảo chất lượng của nước mắm. Đúc kết từ phương pháp cổ truyền tại địa phương, qui trình sản xuất nước mắm 584 Nha Trang luôn đảm bảo nước mắm sản xuất ra đạt chất lượng cao với hương vị thơm ngon, đậm đà; có màu vàng rơm óng ánh; đảm bảo an toàn vệ sinh thực phẩm.<br>
Màu vàng rơm – vị đậm đà<br>
✈️ Ship toàn quốc - Đặc biệt TP.HCM
`,
      media: [
        "img/nm584/nm1.jpg","img/nm584/nm2.jpg",
        "img/nm584/nm3.jpg","img/nm584/nm4.jpg"
      ]
    }
  ];

  /*********************************
   * CLICK CARD → CHI TIẾT
   *********************************/
  cards.forEach((card, index) => {
    const product = data[index];
    if (!product) return;

    card.addEventListener("click", () => {
      cardWrapper.style.display = "none";
      detail.classList.remove("hidden");

      title.textContent = product.title;
      title.style.color = "#2d6a4f";
      desc.innerHTML = product.desc;

      // ===== CHUYỂN BUY BOX =====
      fruitBox.classList.add("hidden");
      fsBox.classList.add("hidden");

      if (product.buyType === "fishsauce") {
        fsBox.classList.remove("hidden");
        initFishSauce(product);
      } else {
        fruitBox.classList.remove("hidden");
        calcTotal();
      }

      // ===== GALLERY =====
      gallery.innerHTML = "";
      product.media.forEach(src => {
        gallery.insertAdjacentHTML(
          "beforeend",
          src.endsWith(".mp4")
            ? `<video src="${src}" controls></video>`
            : `<img src="${src}">`
        );
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  /*********************************
   * BACK BUTTON
   *********************************/
  document.querySelector(".back-btn")?.addEventListener("click", () => {
    detail.classList.add("hidden");
    cardWrapper.style.display = "grid";
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /*********************************
   * POPUP MEDIA
   *********************************/
  document.addEventListener("click", e => {
    const target = e.target.closest(".gallery img, .gallery video");
    if (!target) return;

    popup.classList.remove("hidden");
    popupContent.innerHTML = target.outerHTML;
    document.body.style.overflow = "hidden";
  });

  function closePopup() {
    popup.classList.add("hidden");
    popupContent.innerHTML = "";
    document.body.style.overflow = "";
  }

  closePopupBtn?.addEventListener("click", closePopup);
  popup.addEventListener("click", e => {
    if (e.target === popup) closePopup();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closePopup();
  });

  /*********************************
   * MUA HÀNG (TRÁI CÂY)
   *********************************/
  const qtyInput = document.getElementById("qty");
  const boxSelect = document.getElementById("box");
  const sizeSelect = document.getElementById("size");
  const totalEl = document.getElementById("total");

  const PRICE_BY_SIZE = {
    small: 180000,
    medium: 220000,
    large: 260000
  };

  function calcTotal() {
    const qty  = +qtyInput.value;
    const box  = +boxSelect.value;
    const size = sizeSelect.value;

    const price = PRICE_BY_SIZE[size] || 0;
    const total = qty * box * price;

    totalEl.textContent = total.toLocaleString("vi-VN") + "₫";
  }

  qtyInput?.addEventListener("input", calcTotal);
  boxSelect?.addEventListener("change", calcTotal);
  sizeSelect?.addEventListener("change", calcTotal);

  document.querySelector(".qty-plus")?.addEventListener("click", () => {
    qtyInput.value++;
    calcTotal();
  });

  document.querySelector(".qty-minus")?.addEventListener("click", () => {
    qtyInput.value = Math.max(1, qtyInput.value - 1);
    calcTotal();
  });

  document.querySelector(".cancel-btn")?.addEventListener("click", () => {
    qtyInput.value = 1;
    boxSelect.value = "0.5";
    sizeSelect.value = "small";
    calcTotal();
  });

  document.querySelector(".buy-btn")?.addEventListener("click", () => {
    const size = sizeSelect.value;
    const sizeLabel =
      size === "small" ? "Nhỏ" :
      size === "medium" ? "Vừa" : "To";

    addToCart({
      title: `${title.textContent} (${sizeLabel})`,
      qty: +qtyInput.value,
      box: boxSelect.value,
      price: PRICE_BY_SIZE[size],
      total: parseInt(totalEl.textContent.replace(/\D/g, ""))
    });

    showCartToast();
  });

  /*********************************
   * NƯỚC MẮM
   *********************************/
  function initFishSauce(product) {
    const qtyEl = document.getElementById("fs-qty");
    const proteinEl = document.getElementById("fs-protein");
    const bottleEl = document.getElementById("fs-bottle");
    const totalEl = document.getElementById("fs-total");

    proteinEl.innerHTML = "";

    Object.keys(product.options).forEach(p => {
      proteinEl.insertAdjacentHTML(
        "beforeend",
        `<option value="${p}">${p}° đạm</option>`
      );
    });

    function calc() {
      const opt = product.options[proteinEl.value];
      bottleEl.value = opt.bottle;
      totalEl.textContent =
        (qtyEl.value * opt.price).toLocaleString("vi-VN") + "₫";
    }

    qtyEl.oninput = calc;
    proteinEl.onchange = calc;
    calc();

    document.querySelector(".buy-btn-fs").onclick = () => {
      addToCart({
        title: `${product.title} (${proteinEl.value}° - ${bottleEl.value})`,
        qty: +qtyEl.value,
        box: bottleEl.value,
        price: product.options[proteinEl.value].price,
        total: +totalEl.textContent.replace(/\D/g, "")
      });

      showCartToast();
    };
  }

});
