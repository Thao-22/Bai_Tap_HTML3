function xoaDong(btn) {
  var tr = btn.parentNode.parentNode;
  tr.parentNode.removeChild(tr);
}
// Tự tính lại cột "Tổng" khi sửa số lượng / đơn giá
function capNhat(input) {
  var o = input.parentNode.parentNode.getElementsByTagName("input");
  var sl = Number(o[0].value), dg = Number(o[1].value);
  o[2].value = (isNaN(sl) || isNaN(dg)) ? "" : sl * dg;
}
