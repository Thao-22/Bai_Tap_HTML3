function tinhCanChi() {
  var nam = document.getElementById("nam").value.trim();
  var loi = document.getElementById("loi");
  var kq = document.getElementById("kq");
  loi.innerHTML = ""; kq.value = "";
  if (nam === "") { loi.innerHTML = "Vui lòng nhập năm!"; return; }
  if (!/^\d+$/.test(nam)) { loi.innerHTML = "Năm phải là số nguyên dương!"; return; }
  nam = parseInt(nam);
  if (nam < 1 || nam > 9999) { loi.innerHTML = "Năm phải nằm trong khoảng 1 - 9999!"; return; }
  var can = ["Canh","Tân","Nhâm","Quý","Giáp","Ất","Bính","Đinh","Mậu","Kỷ"];
  var chi = ["Thân","Dậu","Tuất","Hợi","Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi"];
  kq.value = can[nam % 10] + " " + chi[nam % 12];
}
