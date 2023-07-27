import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Myprofile extends Component {
  static contextType = MyContext; // using this.context to access global state
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
    if (this.context.token === '') return (<Navigate replace to='/login' />);
    return (
      <div className="align-center w-50">
        <h2 className="text-center">THÔNG TIN CÁ NHÂN</h2>
        <form>
          <div class="mb-3">
            <label for="InputEmail1" class="form-label" >Tên Người Dùng</label>
            <input class="form-control" id="InputEmail1" type="text" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }}  />
          </div>
          <div class="mb-3">
            <label for="InputPassword1" class="form-label">Mật Khẩu</label>
            <input placeholder="Nhập Mật Khẩu"type="password" class="form-control" id="InputPassword1"  value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }}/>
          </div>
          <div class="mb-3">
            <label for="InputName1" class="form-label" >Tên</label>
            <input class="form-control" id="InputEmail1" type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }}  />
          </div>
          <div class="mb-3">
            <label class="text" for="Tel1">Điện Thoại</label>
            <input class="form-control" id="Tel1" type="tel" value={this.state.txtPhone} onChange={(e) => { this.setState({ txtPhone: e.target.value }) }} />
          </div>
          <div class="mb-3">
            <label class="text" for="Email1">Email</label>
            <input placeholder="Hệ thống sẽ gửi ID và Token để bạn xác nhận"class="form-control" id="Email1" type="email" value={this.state.txtEmail} onChange={(e) => { this.setState({ txtEmail: e.target.value }) }}  />
          </div>
          <button type="submit" class="btn btn-primary" value="UPDATE" onClick={(e) => this.btnSignupClick(e)} >CẬP NHẬT</button>
        </form>
      </div>
    );
  }
  componentDidMount() {
    if (this.context.customer) {
      this.setState({
        txtUsername: this.context.customer.username,
        txtPassword: this.context.customer.password,
        txtName: this.context.customer.name,
        txtPhone: this.context.customer.phone,
        txtEmail: this.context.customer.email
      });
    }
  }
  // event-handlers
  btnUpdateClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const customer = { username: username, password: password, name: name, phone: phone, email: email };
      this.apiPutCustomer(this.context.customer._id, customer);
    } else {
      alert('VUI LÒNG NHẬP LẠI THÔNG TIN');
    }
  }
  // apis
  apiPutCustomer(id, customer) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/customer/customers/' + id, customer, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('THÀNH CÔNG');
        this.context.setCustomer(result);
      } else {
        alert('KHÔNG THÀNH CÔNG');
      }
    });
  }
}
export default Myprofile;