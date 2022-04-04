export class DanhSach {
  danhSach = [];
  constructor() {}

  taoItem = (monAn) => {
    this.danhSach.push(monAn);
  };

  xoaItem = (maMonAn) => {
    this.danhSach = this.danhSach.filter((monAn) => monAn.maMonAn !== maMonAn);
  };

  luuLocalStorage = (key) => {
    localStorage.setItem(key, JSON.stringify(this.danhSach));
  };
  layLocalStorage = (key) => {
    let sDanhSachLocal = localStorage.getItem(key);
    if (sDanhSachLocal) {
      this.danhSach = JSON.parse(sDanhSachLocal);
    }
  };
}
