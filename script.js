const typewriters = document.querySelectorAll('.typewriter');

typewriters.forEach(el => {
  el.addEventListener('animationend', (e) => {
    if (e.animationName === 'typing') {
      el.classList.add('done'); // thêm class 'done' cho từng p
    }
  });
});

const items = document.querySelectorAll('.menu ul li');
const indicator = document.querySelector('.menu .indicator');

function moveIndicator(el) {
  indicator.style.width = el.offsetWidth + 'px';
  indicator.style.left = el.offsetLeft + 'px';
}

items.forEach(item => {
  item.addEventListener('mouseenter', () => moveIndicator(item));
});

/* mặc định Trang chủ */
moveIndicator(items[0]);
