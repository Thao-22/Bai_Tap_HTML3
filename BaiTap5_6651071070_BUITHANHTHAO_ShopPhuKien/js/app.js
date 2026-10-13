// =====================================================================
// app.js - Ứng dụng Vue 3 (CDN) cho shop phụ kiện điện thoại
// Vue.global.js đã nạp trước file này nên có thể dùng Vue.createApp.
//
// SO SÁNH NGẮN: nếu dùng Vanilla JS, mỗi lần thêm/xoá giỏ hàng phải tự
// querySelector + cập nhật DOM thủ công (số lượng ở header, danh sách và
// tổng tiền ở aside). Vue tự động làm điều này nhờ reactivity: ta chỉ đổi
// dữ liệu (cart), giao diện tự cập nhật theo.
// =====================================================================

const app = Vue.createApp({

  // data(): trạng thái (dữ liệu) của ứng dụng. UI = function của data.
  data() {
    return {
      tuKhoa: '',   // từ khoá tìm kiếm, liên kết 2 chiều với ô input qua v-model
      cart: [],     // mảng giỏ hàng: mỗi phần tử { id, ten, anh, gia, soLuong }
      products: [
        { id: 1, ten: 'Ốp lưng xanh điện', anh: '../images/xanh.webp', gia: 250000, moTa: 'Silicone mềm, viền chống sốc' },
        { id: 2, ten: 'Ốp lưng trong bạc', anh: '../images/trang.jpg', gia: 220000, moTa: 'Mỏng nhẹ, không ố vàng' },
        { id: 3, ten: 'Đế sạc không dây', anh: '../images/kday.jpg', gia: 250000, moTa: 'Sạc nhanh 15W, chuẩn Qi' },
        { id: 4, ten: 'Tai nghe TWS Active', anh: '../images/Tai-nghe.jpg', gia: 450000, moTa: 'Bluetooth 5.3, pin 24 giờ' },
        { id: 5, ten: 'Cáp sạc Type-C', anh: '../images/day-sac-nhanh-hoco-x74.jpg', gia: 120000, moTa: 'Dây dù bền, dài 1m' },
        { id: 6, ten: 'Củ sạc nhanh 20W', anh: '../images/images.jpg', gia: 180000, moTa: 'Nhỏ gọn, an toàn chống quá nhiệt' },
        { id: 7, ten: 'Pin dự phòng 10.000mAh', anh: '../images/duphong.jpg', gia: 390000, moTa: 'Hai cổng ra, có đèn báo pin' },
        { id: 8, ten: 'Giá đỡ điện thoại', anh: '../images/giado.jpg', gia: 95000, moTa: 'Gập gọn, điều chỉnh góc nhìn' }
      ]
    };
  },

  // computed: giá trị tự tính lại khi dữ liệu nó phụ thuộc thay đổi
  computed: {
    // cartCount: tổng số lượng sản phẩm trong giỏ -> hiển thị ở header "Giỏ hàng ({{ cartCount }})"
    cartCount() {
      return this.cart.reduce((tong, item) => tong + item.soLuong, 0);
    },

    // tongTien: tổng tiền = Σ (giá x số lượng) -> hiển thị ở aside giỏ hàng
    tongTien() {
      return this.cart.reduce((tong, item) => tong + item.gia * item.soLuong, 0);
    },

    // danhSachLoc: lọc products theo tuKhoa (không phân biệt hoa thường và dấu).
    // Template render danhSachLoc thay vì products nên gõ tới đâu danh sách lọc tới đó.
    danhSachLoc() {
      const kw = this.boDau(this.tuKhoa.trim());
      if (!kw) return this.products;
      return this.products.filter((sp) => this.boDau(sp.ten).includes(kw));
    }
  },

  methods: {
    // themVaoGio(sanPham): đẩy sản phẩm vào mảng cart.
    // Nếu đã có trong giỏ thì tăng số lượng, chưa có thì thêm dòng mới.
    // Chỉ cần đổi cart, Vue tự cập nhật header + aside (không cần querySelector).
    themVaoGio(sanPham) {
      const daCo = this.cart.find((item) => item.id === sanPham.id);
      if (daCo) {
        daCo.soLuong++;
      } else {
        this.cart.push({ id: sanPham.id, ten: sanPham.ten, anh: sanPham.anh, gia: sanPham.gia, soLuong: 1 });
      }
    },

    // xoaKhoiGio(index): xoá cả dòng sản phẩm ở vị trí index khỏi giỏ.
    xoaKhoiGio(index) {
      this.cart.splice(index, 1);
    },

    // dinhDangTien(so): đổi số thành chuỗi tiền Việt, ví dụ 250000 -> "250.000 đ"
    dinhDangTien(so) {
      return so.toLocaleString('vi-VN') + ' đ';
    },

    // boDau(chuoi): đưa về chữ thường và bỏ dấu tiếng Việt để tìm "op lung" ra "Ốp lưng"
    boDau(chuoi) {
      return chuoi
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd');
    }
  }
});

// Gắn ứng dụng vào <div id="app"> trong index.html
app.mount('#app');
