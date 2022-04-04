import { HoaDonList } from "../models/HoaDonList.js";
import { Menu } from "../models/Menu.js";
import { MonAn } from "../models/MonAn.js";

// -------------- VARIABLES -------------- //

const DANH_SACH_MON_AN = "DANH_SACH_MON_AN";
const DANH_SACH_HOA_DON = "DANH_SACH_HOA_DON";

const danhSachMenu = new Menu();
const danhSachHoaDon = new HoaDonList();

danhSachMenu.layLocalStorage(DANH_SACH_MON_AN);
danhSachHoaDon.layLocalStorage(DANH_SACH_HOA_DON);

// -------------- FUNCTION -------------- //

document.querySelector("#btnThem").onclick = () => {
  let monAn = new MonAn();
  let arrInput = document.querySelectorAll(".baiTap1 input");
  for (const input of arrInput) {
    let { id, value } = input;
    monAn[id] = value;
  }
  danhSachMenu.taoItem(monAn);
  danhSachMenu.luuLocalStorage(DANH_SACH_MON_AN);
  renderMangMonAn();
  renderDanhSachdanhSachMenu();
};

window.xoaMonAn = (maMonAn) => {
  danhSachMenu.xoaItem(maMonAn);
  danhSachHoaDon.xoaItem(maMonAn);
  danhSachMenu.luuLocalStorage(DANH_SACH_MON_AN);
  danhSachHoaDon.luuLocalStorage(DANH_SACH_HOA_DON);
  renderMangMonAn();
  renderDanhSachHoaDon();
  renderDanhSachdanhSachMenu();
};

window.capNhatHoaDon = (action, maMonAnClick) => {
  let monAndanhSachMenu = danhSachMenu.danhSach.find(
    (monAn) => monAn.maMonAn === maMonAnClick
  );
  danhSachHoaDon.capNhatHoaDon(
    action,
    monAndanhSachMenu,
    danhSachHoaDon.danhSach
  );
  renderDanhSachHoaDon();
  danhSachHoaDon.luuLocalStorage(DANH_SACH_HOA_DON);
};

// -------------- REDNER LAYOUT -------------- //

const renderMangMonAn = () => {
  let sHtml = "";
  danhSachMenu.danhSach.forEach((monAn) => {
    sHtml += `
  <tr>
      <td>${monAn.maMonAn}</td>
      <td>${monAn.tenMonAn}</td>
      <td>${monAn.giaTien}</td>
      <td>
          <img style="width: 100px;height:100px;" src=${monAn.linkAnh} />
      </td>
      <td>
          <button class="btn btn-danger" onclick="xoaMonAn('${monAn.maMonAn}')">Xoá</button>
      </td>
  </tr>`;
  });
  document.querySelector("#tblDanhMucMonAn").innerHTML = sHtml;
};

const renderDanhSachdanhSachMenu = () => {
  let sHtml = "";
  danhSachMenu.danhSach.forEach((monAn) => {
    sHtml += `
    <div class="row mt-3">
        <div class="col-3">${monAn.maMonAn}</div>
        <div class="col-3">${monAn.tenMonAn}</div>
        <div class="col-3">${monAn.giaTien}</div>
        <div class="col-3">
            <button class="bg-danger text-white btn" onclick="capNhatHoaDon('+','${monAn.maMonAn}')">+</button>
            <button class="bg-danger text-white btn" onclick="capNhatHoaDon('-','${monAn.maMonAn}')">-</button>
        </div>
    </div>
    `;
  });
  document.querySelector("#danhSachMenu").innerHTML = sHtml;
};

const renderDanhSachHoaDon = () => {
  let sHtml = "";
  danhSachHoaDon.danhSach.forEach((monAn) => {
    sHtml += `
    <tr>
        <td>${monAn.maMonAn}</td>
        <td>${monAn.tenMonAn}</td>
        <td>${monAn.soLuong}</td>
        <td>${monAn.thanhTien}</td>
    </tr>
    `;
  });
  document.querySelector("#tblHoaDon").innerHTML = sHtml;
  renderTongTienHoaDon();
};

const renderTongTienHoaDon = () => {
  let sHtml = `
    <tr>
    <tr>
        <td></td>
        <td></td>
        <td id="txtThanhTien" class="font-weight-bold">Thành tiền</td>
        <td>${danhSachHoaDon.tinhTongTien()}</td>
    </tr>
    </tr>
  `;
  document.querySelector("#tfThanhTien").innerHTML = sHtml;
};

renderMangMonAn();
renderDanhSachdanhSachMenu();
renderDanhSachHoaDon();

