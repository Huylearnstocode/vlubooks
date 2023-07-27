import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import Dropdown from 'react-bootstrap/Dropdown';

class Inform extends Component {
  static contextType = MyContext;
  render() {
    return (
      <div className="border-bottom">
        <div className="float-left">
        {this.context.token === '' ?
          <div class="login"><Link to='/login'><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg> Đăng Nhập</Link></div>
          :
          <Dropdown>
            Hello <b>{this.context.customer.name}</b>
          <Dropdown.Toggle variant="body-color" id="dropdown-basic">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
          </Dropdown.Toggle>

          <Dropdown.Menu className="profile">
            <li><Link to='/home' onClick={() => this.lnkLogoutClick()}>Đăng Xuất</Link></li>
            <li><Link to='/myprofile'>Thông Tin Cá Nhân</Link></li> 
            <li><Link to='/myorders'>Đơn Hàng</Link></li>  
          </Dropdown.Menu>
        </Dropdown>  
        }
        </div>
        <div className="float-right">
          Bạn có <Link to='/mycart'><b>{this.context.mycart.length}</b></Link> sản phẩm
        </div>
        <div className="float-clear" />
      </div>
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
}
export default Inform;