import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class ProductDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtID: '',
      txtName: '',
      txtPrice: 0,
      cmbCategory: '',
      imgProduct: '',
      txtAuthor: '',
      P:''
    };
  }
  render() {
    const cates = this.state.categories.map((cate) => {
      if (this.props.item != null) {
        return (<option key={cate._id} value={cate._id} selected={cate._id === this.props.item.category._id}>{cate.name}</option>);
      } else {
        return (<option key={cate._id} value={cate._id}>{cate.name}</option>);
      }
    });
    return (
      <div className="float-right">
        <h2 className="text-center">CHI TIẾT SẢN PHẨM</h2>
        <form>
          <div class="mb-3">
            <label for="ID" class="form-label">Mã sách </label>
            <input type="text" class="form-control" id="ID" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} readOnly={true} />
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Tên sách </label>
            <input type="text" class="form-control" id="name"value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }}/>
          </div>
          <div class="mb-3">
            <label for="price" class="form-label">Giá tiền </label>
            <input type="text" class="form-control" id="price" value={this.state.txtPrice} onChange={(e) => { this.setState({ txtPrice: e.target.value }) }}/>
          </div>
          <div class="mb-3">
            <label for="category" class="form-label">Danh Mục </label>
            <select id="category "onChange={(e) => { this.setState({ cmbCategory: e.target.value }) }}>{cates}</select>
          </div>
          <div class="mb-3">
            <label for="author" class="form-label">Tác Giả </label>
            <input type="text" class="form-control" id="author" value={this.state.txtAuthor} onChange={(e) => { this.setState({ txtAuthor: e.target.value }) }} />
          </div>
          <div class="mb-3">
            <label for="pbyear" class="form-label">Năm xuất bản </label>
            <input type="text" class="form-control" id="pbyear" value={this.state.txtPublishYear} onChange={(e) => { this.setState({ txtPublishYear: e.target.value }) }} />
          </div>
          <div colSpan="2"><img src={this.state.imgProduct} width="300px" height="300px" alt="" /></div>
          <input type="submit" value="THÊM" onClick={(e) => this.btnAddClick(e)} />
          <input type="submit" value="CẬP NHẬT" onClick={(e) => this.btnUpdateClick(e)} />
          <input type="submit" value="XÓA" onClick={(e) => this.btnDeleteClick(e)} />
        </form>
      </div>
    );
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({
        txtID: this.props.item._id,
        txtName: this.props.item.name,
        txtPrice: this.props.item.price,
        cmbCategory: this.props.item.category._id,
        imgProduct: 'data:image/jpg;base64,' + this.props.item.image,
        txtAuthor: this.props.item.author,
        txtPublishYear: this.props.item.publishyear
      });
    }
  }
  // event-handlers
  previewImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.setState({ imgProduct: evt.target.result });
      }
      reader.readAsDataURL(file);
    }
  }
  // apis
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
  // event-handlers
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/, ''); // remove "data:image/...;base64,"
    if (name && price && category && image && author && publishyear) {
      const prod = { name: name, price: price, category: category, image: image, author: author, publishyear: publishyear};
      this.apiPostProduct(prod);
    } else {
      alert('Vui lòng nhập đầy đủ thông tin');
    }
    const author = this.state.txtAuthor;
    const publishyear = parseInt(this.state.txtPrice);
  }
  // apis
  apiPostProduct(prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/products', prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('THÀNH CÔNG');
        this.apiGetProducts();
      } else {
        alert('THẤT BẠI');
      }
    });
  }
  apiGetProducts() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + this.props.curPage, config).then((res) => {
      const result = res.data;
      this.props.updateProducts(result.products, result.noPages);
    if (result.products.length !== 0) {
      this.props.updateProducts(result.products, result.noPages);
    } else {
      axios.get('/api/admin/products?page=' + (this.props.curPage - 1), config).then((res) => {
        const result = res.data;
        this.props.updateProducts(result.products, result.noPages);
        });
      }
    });
  }
   // event-handlers
   btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/, ''); // remove "data:image/...;base64,"
    if (id && name && price && category && image) {
      const prod = { name: name, price: price, category: category, image: image, author: author, publishyear: publishyear};
      this.apiPutProduct(id, prod);
    } else {
      alert('Vui lòng nhập đầy đủ thông tin');
    }
    const author = this.state.txtAuthor;
    const publishyear = parseInt(this.state.txtPrice);
  }
  // apis
  apiPutProduct(id, prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/products/' + id, prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('THÀNH CÔNG');
        this.apiGetProducts();
      } else {
        alert('THẤT BẠI');
      }
    });
  }
  // event-handlers
  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('ARE YOU SURE?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteProduct(id);
      } else {
        alert('Vui lòng nhập ID');
      }
    }
  }
  // apis
  apiDeleteProduct(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/products/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('THÀNH CÔNG');
        this.apiGetProducts();
      } else {
        alert('KHÔNG THÀNH CÔNG');
      }
    });
  }
}
export default ProductDetail;