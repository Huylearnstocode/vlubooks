import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class CategoryDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtName: ''
    };
  }
  render() {
    return (
      <div className="float-right">
        <h2 className="text-center">CHI TIẾT DANH MỤC</h2>
        <form>
        <div class="mb-3">
            <label for="ID" class="form-label">Mã Danh Mục </label>
            <input type="text" class="form-control" id="ID" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} readOnly={true} />
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Tên Danh Mục </label>
            <input type="text" class="form-control" id="name" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} />
          </div>
          <input type="submit" value="ADD NEW" onClick={(e) => this.btnAddClick(e)} />
          <input type="submit" value="UPDATE" onClick={(e) => this.btnUpdateClick(e)}/>
          <input type="submit" value="DELETE" onClick={(e) => this.btnDeleteClick(e)} />
        </form>
      </div>
    );
  }
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({ txtID: this.props.item._id, txtName: this.props.item.name });
    }
  }
  // event-handlers
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    if (name) {
      const cate = { name: name };
      this.apiPostCategory(cate);
    } else {
      alert('HÃY NHẬP TÊN');
    }
  }

  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    if (id && name) {
      const cate = { name: name };
      this.apiPutCategory(id, cate);
    } else {
      alert('Vui lòng nhập thông tin ');
    }
  }

  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('BẠN CHẮC VỚI QUYẾT ĐỊNH NÀY?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteCategory(id);
      } else {
        alert('HÃY NHẬP ID');
      }
    }
  }
  // apis
  apiPostCategory(cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/categories', cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('THÀNH CÔNG');
        this.apiGetCategories();
      } else {
        alert('KHÔNG THÀNH CÔNG');
      }
    });
  }
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.props.updateCategories(result);
    });
  }
  apiPutCategory(id, cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/categories/' + id, cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('THÀNH CÔNG');
        this.apiGetCategories();
      } else {
        alert('KHÔNG THÀNH CÔNG');
      }
    });
  }
  apiDeleteCategory(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/categories/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('THÀNH CÔNG');
        this.apiGetCategories();
      } else {
        alert('KHÔNG THÀNH CÔNG');
      }
    });
  }
}
export default CategoryDetail;