import { DanhSach } from "./DanhSach.js";
import { HoaDon } from "./HoaDon.js";
export class HoaDonList extends DanhSach {
  constructor() {
    super();
  }

  capNhatHoaDon = (action, monAnMoi) => {
    console.log({ action, monAnMoi });
    let monAn = new HoaDon();
    let danhSachHoaDon = this.danhSach;
    let indexMonAn = danhSachHoaDon.findIndex(
      (monAn) => monAn.maMonAn === monAnMoi.maMonAn
    );

    if (action === "+") {
      if (indexMonAn < 0) {
        monAn.maMonAn = monAnMoi.maMonAn;
        monAn.tenMonAn = monAnMoi.tenMonAn;
        monAn.soLuong = 1;
        monAn.thanhTien = monAnMoi.giaTien;
        this.taoItem(monAn);
      } else {
        let capNhatMonAn = danhSachHoaDon[indexMonAn];
        let capNhatSoLuong = capNhatMonAn.soLuong + 1;
        capNhatMonAn = {
          ...capNhatMonAn,
          soLuong: capNhatSoLuong,
          thanhTien: monAnMoi.giaTien * capNhatSoLuong,
        };
        danhSachHoaDon[indexMonAn] = capNhatMonAn;
      }
    } else {
      if(indexMonAn < 0){
        alert('Món ăn không tồn tại')
        return
      }
      let capNhatMonAn = danhSachHoaDon[indexMonAn];
      let capNhatSoLuong = capNhatMonAn.soLuong - 1;
      if (capNhatSoLuong > 0) {
        capNhatMonAn = {
          ...capNhatMonAn,
          soLuong: capNhatSoLuong,
          thanhTien: monAnMoi.giaTien * capNhatSoLuong,
        };
        danhSachHoaDon[indexMonAn] = capNhatMonAn;
      } else {
        this.xoaItem(capNhatMonAn.maMonAn);
      }
    }
  };

  tinhTongTien = () => {
    return this.danhSach.reduce((acc, current) => {
      return parseFloat(acc) + parseFloat(current.thanhTien)
    }, 0);
  };
}
