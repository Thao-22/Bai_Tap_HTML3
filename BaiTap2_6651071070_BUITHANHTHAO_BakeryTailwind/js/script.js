// ===== 1. Toggle menu di động =====
// Tailwind chỉ cung cấp class, không có hành vi. Ta phải tự viết JS:
// bấm hamburger -> đổi class hidden/flex của menu di động.
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden'); // ẩn <-> hiện
  mobileMenu.classList.toggle('flex');   // flex khi đang hiện
  const isOpen = !mobileMenu.classList.contains('hidden');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

// Bấm vào 1 mục trong menu di động thì tự đóng menu
mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('flex');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Phóng to cửa sổ lên desktop (>= 768px) thì đóng menu di động, tránh lỗi hiển thị
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('flex');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

// ===== 2. Hiệu ứng nhỏ: tô sáng link menu theo section đang xem =====
const sections = document.querySelectorAll('section[id], aside[id], footer[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((a) => {
        a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach((s) => observer.observe(s));

// ===== 3. Form đặt bánh: kiểm tra đơn giản + thông báo (không gửi server) =====
const form = document.getElementById('order-form');
const msg = document.getElementById('form-msg');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const ten = form.ten.value.trim();
  const sdt = form.sdt.value.trim();
  msg.classList.remove('hidden', 'text-green-700', 'text-red-600');

  if (!ten || !/^0\d{9}$/.test(sdt.replace(/\s/g, ''))) {
    msg.classList.add('text-red-600');
    msg.textContent = 'Vui lòng nhập tên và số điện thoại 10 số bắt đầu bằng 0.';
    return;
  }
  msg.classList.add('text-green-700');
  msg.textContent = 'Đã nhận yêu cầu! Tiệm sẽ gọi lại cho ' + ten + ' sớm nhất.';
  form.reset();
});
