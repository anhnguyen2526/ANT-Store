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

/* ===== POPUP CHO SLIDE NƯỚC MẮM ===== */
document.addEventListener("click", e => {
  const img = e.target.closest(".fs-slide img");
  if (!img) return;

  popup.classList.remove("hidden");
  popupContent.innerHTML = `
    <img src="${img.src}">
    <p style="color:white;text-align:center;margin-top:10px;">
      ${img.dataset.caption || ""}
    </p>
  `;
  document.body.style.overflow = "hidden";
});

  const fruitBox = document.querySelector(".fruit-box");
  const fsBox = document.querySelector(".fishsauce-box");

  /* ===== SLIDER NƯỚC MẮM ===== */
  const fsSlider = document.querySelector(".fs-slider");

  const fsPrev = document.querySelector(".fs-nav.left");
  const fsNext = document.querySelector(".fs-nav.right");

  let fsSlides = [];
  let fsIndex = 0;

fsPrev.onclick = () => {
  fsIndex--;
  updateFishSlide();
};

fsNext.onclick = () => {
  fsIndex++;
  updateFishSlide();
};

  function initFishSlide(slides) {
  const wrap = document.querySelector(".fs-slide");
  fsSlides = slides;
  fsIndex = 0;

  wrap.innerHTML = "";
  slides.forEach(s => {
    wrap.insertAdjacentHTML(
      "beforeend",
      `<img src="${s.src}" data-caption="${s.caption || ""}">`
    );
  });

  updateFishSlide();
}

function updateFishSlide() {
  const wrap = document.querySelector(".fs-slide");
  if (!wrap || !wrap.children.length) return; // 👈 FIX

  const maxIndex = fsSlides.length - 3;
  fsIndex = Math.max(0, Math.min(fsIndex, maxIndex));

  const imgWidth = wrap.children[0].offsetWidth + 10;
  wrap.style.transform = `translateX(-${fsIndex * imgWidth}px)`;
}

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
        "img/daumocchau/dau1.jpg","img/daumocchau/dau2.jpg","img/daumocchau/dau3.jpg",
        "img/daumocchau/dau4.jpg","img/daumocchau/dau5.jpg","img/daumocchau/dau6.jpg",
        "img/daumocchau/dau7.jpg","img/daumocchau/dau8.jpg","img/daumocchau/dau9.jpg",
        "img/daumocchau/daumocchau.jpg","video/dau1.mp4"
      ]
    },
    // {
    //   title: "Cafe chất",
    //   desc: "Cafe rang mộc – đậm vị – không pha trộn.",
    //   media: ["img/cafe1.jpg", "img/cafe2.jpg"]
    // },
    {
      title: "Hạt điều",
      desc: "Hạt điều rang muối – giòn béo tự nhiên.",
      media: ["img/dieu1.jpg", "video/dieu.mp4"]
    },
    // {
    //   title: "Mật ong",
    //   desc: "Mật ong nguyên chất.",
    //   media: ["img/dieu1.jpg"]
    // },
    // {
    //   title: "Gạo ST25",
    //   desc: "Gạo ST25 – hạt ngọc Việt.",
    //   media: ["img/dieu1.jpg"]
    // },
    {
      title: "Nước mắm 584",
      buyType: "fishsauce",
            /* ===== SLIDER DATA ===== */
      slides: [
        { src: "img/nm584/60nb.png", caption: "60° đạm – Chai 200ml (đặc biệt)" },
        { src: "img/nm584/40nb.png", caption: "40° đạm – Chai 500ml" },
        { src: "img/nm584/30nb.png", caption: "30° đạm – Chai 500ml" },
        { src: "img/nm584/25nb.png", caption: "25° đạm – Chai 500ml" },
        { src: "img/nm584/12nb.jpg", caption: "12° đạm – Can 5 lít" },
      ],
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
        "img/nm584/nm3.jpg","img/nm584/nm4.jpg",
        "img/nm584/nm5.jpg","img/nm584/nm6.jpg"
      ]
    }
  ];

  /*********************************
   * RENDER SLIDER
   *********************************/

 

  /*********************************
   * CLICK CARD → CHI TIẾT
   *********************************/
  cards.forEach((card, index) => {
    const product = data[index];
    if (!product) return;

    card.onclick = () => {
      cardWrapper.style.display = "none";
      detail.classList.remove("hidden");

      title.textContent = product.title;
      desc.innerHTML = product.desc;

      fruitBox.classList.add("hidden");
      fsBox.classList.add("hidden");
      fsSlider.classList.add("hidden");

      if (product.buyType === "fishsauce") {
        fsBox.classList.remove("hidden");
        fsSlider.classList.remove("hidden");

initFishSlide(product.slides);

        initFishSauce(product);
      } else {
        fruitBox.classList.remove("hidden");
        calcTotal();
      }

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
    };
  });

  /*********************************
   * BACK BUTTON
   *********************************/
  document.querySelector(".back-btn").onclick = () => {
    detail.classList.add("hidden");
    cardWrapper.style.display = "grid";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /*********************************
   * POPUP CLOSE
   *********************************/
  function closePopup() {
    popup.classList.add("hidden");
    popupContent.innerHTML = "";
    document.body.style.overflow = "";
  }

  closePopupBtn.onclick = closePopup;
  popup.onclick = e => e.target === popup && closePopup();
  document.addEventListener("keydown", e => e.key === "Escape" && closePopup());

  /*********************************
   * TRÁI CÂY
   *********************************/
  const qtyInput = document.getElementById("qty");
  const boxSelect = document.getElementById("box");
  const sizeSelect = document.getElementById("size");
  const totalEl = document.getElementById("total");

  const PRICE_BY_SIZE = { small: 180000, medium: 220000, large: 260000 };

  function calcTotal() {
    totalEl.textContent =
      (qtyInput.value * boxSelect.value * PRICE_BY_SIZE[sizeSelect.value])
        .toLocaleString("vi-VN") + "₫";
  }

  qtyInput.oninput = boxSelect.onchange = sizeSelect.onchange = calcTotal;

  /*********************************
   * NƯỚC MẮM
   *********************************/
  function initFishSauce(product) {
    const qtyEl = document.getElementById("fs-qty");
    const proteinEl = document.getElementById("fs-protein");
    const bottleEl = document.getElementById("fs-bottle");
    const totalEl = document.getElementById("fs-total");

    proteinEl.innerHTML = "";
    Object.keys(product.options).forEach(p =>
      proteinEl.insertAdjacentHTML("beforeend", `<option value="${p}">${p}° đạm</option>`)
    );

    function calc() {
      const opt = product.options[proteinEl.value];
      bottleEl.value = opt.bottle;
      totalEl.textContent = (qtyEl.value * opt.price).toLocaleString("vi-VN") + "₫";
    }

    qtyEl.oninput = proteinEl.onchange = calc;
    calc();
  }

});