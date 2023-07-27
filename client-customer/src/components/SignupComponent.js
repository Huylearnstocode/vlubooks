import axios from 'axios';
import React, { Component } from 'react';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: ''
    };
  }
  render() {
    return (
      <div className="align-center w-50">
        <h2 className="text-center">Đăng Ký</h2>
        <form>
          <div class="mb-3">
            <label for="InputEmail1" class="form-label" >Tên Người Dùng</label>
            <input placeholder="Vui lòng đặt tên không có ký tự đặc biệt"class="form-control" id="InputEmail1" type="text" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} />
          </div>
          <div class="mb-3">
            <label for="InputPassword1" class="form-label">Mật Khẩu</label>
            <input placeholder="Nhập Mật Khẩu"type="password" class="form-control" id="InputPassword1" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }}/>
          </div>
          <div class="mb-3">
            <label class="text" for="Name1">Họ Tên</label>
            <input placeholder="Nhập Đầy Đủ Họ Tên"class="form-control" id="Name1" type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }}/>
          </div>
          <div class="mb-3">
            <label class="text" for="Tel1">Điện Thoại</label>
            <input placeholder="Nhập Số Điện Thoại"class="form-control" id="Tel1" type="tel" value={this.state.txtPhone} onChange={(e) => { this.setState({ txtPhone: e.target.value }) }}/>
          </div>
          <div class="mb-3">
            <label class="text" for="Email1">Email</label>
            <input placeholder="Hệ thống sẽ gửi ID và Token để bạn xác nhận"class="form-control" id="Email1" type="email" value={this.state.txtEmail} onChange={(e) => { this.setState({ txtEmail: e.target.value }) }} />
          </div>
          <button type="submit" class="btn btn-primary" value="submit" onClick={(e) => this.btnSignupClick(e)} >Đăng Ký</button>
        </form>
      </div>
    );
  }
  // event-handlers
  btnSignupClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const account = { username: username, password: password, name: name, phone: phone, email: email };
      this.apiSignup(account);
    } else {
      alert('Vui lòng ghi đầy đủ thông tin');
    }
  }
  // apis
  apiSignup(account) {
    axios.post('/api/customer/signup', account).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }
}
export default Signup;