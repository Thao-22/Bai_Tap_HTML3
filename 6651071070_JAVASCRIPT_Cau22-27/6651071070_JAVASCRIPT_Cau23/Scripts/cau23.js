function tinhLuong() {
  var luong = document.getElementById("luong").value.trim();
  var heso = parseFloat(document.getElementById("heso").value);
  var kq = document.getElementById("kq");
  if (luong === "" || isNaN(luong) || Number(luong) < 0) {
    kq.innerHTML = "<span class='err'>Lương không hợp lệ!</span>";
    return;
  }
  kq.innerHTML = Math.round(Number(luong) * heso);
}
