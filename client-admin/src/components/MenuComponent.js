import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

import { Link } from 'react-router-dom';

class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    return (
      <div className="border-bottom">
      <div className="float-left">
        <ul className="menu">
          <li className="menu"><Link to='/admin/home'>Trang Chủ</Link></li>
          <li className="menu"><Link to='/admin/category'>Danh Mục</Link></li>
          <li className="menu"><Link to='/admin/product'>Sản Phẩm</Link></li>
          <li className="menu"><Link to='/admin/order'>Đơn Đặt Hàng</Link></li>
          <li className="menu"><Link to='/admin/customer'>Khách Hàng</Link></li>          
          
        </ul>
      </div>
      <div className="float-right">
          Hello <b>{this.context.username}</b> <a href="" onClick={() => this.lnkLogoutClick()}>Đăng Xuất</a>
          
        </div>
        <div className="float-clear" />
      </div>
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setUsername('');
  }
}
export default Menu;