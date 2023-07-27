import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import withRouter from '../utils/withRouter';
import 'bootstrap/dist/css/bootstrap.css';

class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: 'huy',
      txtPassword: '123'
    };
  }
  render() {
    return (
      
      <div className="align-center w-50">
        <h2 className="text-center">Đăng Nhập</h2>
        <form class="form-outline mb-4 ">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Tên Người Dùng</label>
          <input class="form-control" id="exampleInputEmail1" type="text" placeholder="Nhập tên người dùng" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Mật Khẩu</label>
          <input placeholder="Nhập mật khẩu vào" type="password" class="form-control" id="exampleInputPassword1" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} />
        </div>
        <input class="btn btn-primary" type="submit" value="Đăng nhập" onClick={(e) => this.btnLoginClick(e)} /><br></br><br></br>Bạn chưa có tài khoản? <Link to='/signup'>Đăng Ký</Link><br></br><br></br><Link to='/active'>Xác Thực Tài Khoản</Link>
        </form>
      </div>
    );
  }
  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      alert('Vui lòng nhập tên đăng nhập và mật khẩu');
    }
  }
  // apis
  apiLogin(account) {
    axios.post('/api/customer/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setCustomer(result.customer);
        this.props.navigate('/home');
      } else {
        alert(result.message);
      }
    });
  }
}
export default withRouter(Login);