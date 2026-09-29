var thucAn = {"Bún bò":20000,"Hủ tiếu":18000,"Bánh canh":17000,"Phở bò":19000,
              "Nuôi":15000,"Bánh mì thịt":12000,"Bánh cuốn":15000};
var nuocUong = {"Cà phê đá":12000,"Cà phê sữa đá":15000,"Chanh dây":13000,"Chanh muối":12000,
                "Xí muội":14000,"Sữa tươi":13000,"Cam vắt":17000};

window.onload = function () {
  napDanhSach("thucan", thucAn);
  napDanhSach("nuocuong", nuocUong);
};

function napDanhSach(id, bang) {
  var sel = document.getElementById(id);
  for (var ten in bang) sel.options[sel.options.length] = new Option(ten, ten);
}

function tinhTien() {
  var dong = "", tong = 0;
  function duyet(id, bang) {
    var sel = document.getElementById(id);
    for (var i = 0; i < sel.options.length; i++) {
      if (sel.options[i].selected) {
        var ten = sel.options[i].value;
        dong += "<tr><td>" + ten + "</td><td>" + bang[ten] + "</td></tr>";
        tong += bang[ten];
      }
    }
  }
  duyet("thucan", thucAn);
  duyet("nuocuong", nuocUong);
  var kq = document.getElementById("kq");
  if (dong === "") { kq.innerHTML = "<span class='err'>Vui lòng chọn ít nhất một món!</span>"; return; }
  var dem = document.getElementsByName("tg")[1].checked;
  if (dem) tong = tong * 1.1;
  kq.innerHTML = "<table><tr><th>Các món đã dùng</th><th>Tiền</th></tr>" + dong +
    (dem ? "<tr><td>Phụ thu ban đêm</td><td>10%</td></tr>" : "") +
    "<tr><td>Tổng tiền</td><td>" + Math.round(tong) + " đồng</td></tr></table>";
}
