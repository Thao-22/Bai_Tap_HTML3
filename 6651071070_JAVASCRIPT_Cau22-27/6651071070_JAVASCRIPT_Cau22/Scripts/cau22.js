function tinh(pheptoan) {
  var a = document.getElementById("so1").value.trim();
  var b = document.getElementById("so2").value.trim();
  var kq = document.getElementById("kq");
  if (a === "" || b === "" || isNaN(a) || isNaN(b)) {
    kq.innerHTML = "<span class='err'>Vui lòng nhập hai số hợp lệ!</span>";
    return;
  }
  a = Number(a); b = Number(b);
  if (pheptoan === "nhan") {
    kq.innerHTML = a * b;
  } else {
    kq.innerHTML = (b === 0) ? "<span class='err'>Không thể chia cho 0!</span>" : a / b;
  }
}
