import axios from 'axios';
import React, { Component } from 'react';

class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtToken: ''
    };
  }
  render() {
    return (
      <div className="align-center">
        <h2 className="text-center">Xác Thực Tài Khoản</h2>
        <form>
          <div class="mb-3">
            <label class="text" for="Check1">ID</label>
            <input placeholder="Nhập mã ID vào đây"class="form-control" id="ID1" type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }}/>
          </div>
          <div class="mb-3">
            <label class="text" for="Check1">Token</label>
            <input placeholder="Nhập mã Token vào đây"class="form-control" id="Token1" type="text" value={this.state.txtToken} onChange={(e) => { this.setState({ txtToken: e.target.value }) }} />
          </div>
          <button type="submit" class="btn btn-primary" value="ACTIVE" onClick={(e) => this.btnActiveClick(e)}>KÍCH HOẠT</button>
        </form>
      </div>
    );
  }
  // event-handlers
  btnActiveClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const token = this.state.txtToken;
    if (id && token) {
      this.apiActive(id, token);
    } else {
      alert('Vui lòng nhập ID và Token');
    }
  }
  // apis
  apiActive(id, token) {
    const body = { id: id, token: token };
    axios.post('/api/customer/active', body).then((res) => {
      const result = res.data;
      if (result) {
        alert('THÀNH CÔNG');
      } else {
        alert('Bạn đã nhập sai ID hoặc Token');
      }
    });
  }
}
export default Active;