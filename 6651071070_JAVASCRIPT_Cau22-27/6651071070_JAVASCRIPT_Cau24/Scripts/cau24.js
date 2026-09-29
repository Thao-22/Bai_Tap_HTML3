function xuatThu() {
  var ngay = document.getElementById("ngay").value.trim();
  var thang = document.getElementById("thang").value;
  var nam = document.getElementById("nam").value.trim();
  var kq = document.getElementById("kq");
  if (!/^\d+$/.test(ngay) || !/^\d+$/.test(nam)) {
    kq.innerHTML = "<span class='err'>Ngày và năm phải là số nguyên dương!</span>";
    return;
  }
  ngay = parseInt(ngay); thang = parseInt(thang); nam = parseInt(nam);
  var d = new Date(2000, thang - 1, ngay);
  d.setFullYear(nam);
  if (d.getDate() !== ngay || d.getMonth() !== thang - 1 || d.getFullYear() !== nam) {
    kq.innerHTML = "<span class='err'>Ngày tháng năm không hợp lệ!</span>";
    return;
  }
  var thu = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
  kq.innerHTML = thu[d.getDay()] + " Ngày " + ngay + " tháng " + thang + " năm " + nam;
}
