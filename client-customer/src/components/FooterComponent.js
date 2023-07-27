import React, { Component } from 'react';
import { FaPhone, FaMapMarkerAlt, FaMailBulk, FaInstagram, FaYoutube, FaFacebookSquare, FaConnectdevelop } from 'react-icons/fa';
import MyContext from '../contexts/MyContext';
import withRouter from '../utils/withRouter';
import axios from 'axios';
class Footer extends Component {
    static contextType = MyContext;
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        };
    }
    render() {
        const iconSize = { fontSize: "18px"}
        return (
            <footer className="footer mt-auto py-3  ">
                <div className="container">
                    <div className="row mt-5 row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top ">
                        <div className="col-md-3 col-sm-6">
                            <h3 className='mb-4'>Liên Hệ</h3>
                            <ul className='list-unstyled'>
                                <li className='d-flex align-items-center mb-4'>
                                    <FaPhone />
                                    <span className='mx-2'>(028)38.256.713-(028)38.225.340- Fax:(028)38.222.726</span>
                                </li>
                                <li className='d-flex align-items-center mb-4'>
                                    <FaMapMarkerAlt /> 
                                    <span className='mx-2'>45 Nguyễn Khắc Nhu, Phường Cô Giang, Quận 1</span>
                                </li>
                                <li className='d-flex align-items-center mb-4'>
                                    <FaMapMarkerAlt /> 
                                    <span className='mx-2'>233A Đ. Phan Văn Trị, Phường 11, Bình Thạnh</span>
                                </li>
                                <li className='d-flex align-items-center mb-4'>
                                    <FaMapMarkerAlt /> 
                                    <span className='mx-2'>69/68 Đ. Đặng Thuỳ Trâm, Phường 13, Bình Thạnh</span>
                                </li>
                                <li className='mb-4'>
                                    <FaMailBulk /> 
                                    <span className='mx-2'>nhasach@vlu.edu.vn</span>
                                </li>
                            </ul>
                            <div className="d-flex mb-4">
                                <h5 className='list-unstyled me-4'>
                                    <FaConnectdevelop/> Kết Nối
                                </h5>
                                <span style = {iconSize} className='me-4'><FaInstagram /></span>
                                <span style = {iconSize} className='me-4'><FaYoutube /></span>
                                <span style = {iconSize} className='me-4'><FaFacebookSquare /></span>
                            </div>
                        </div>
                        { <div className="col-md-3 col-sm-6">
                            <h4 className='mb-4'>VỀ CHÚNG TÔI</h4>
                            <ul className='list-unstyled'>
                                <li className='mb-4'>Giới Thiệu</li>
                                <li className='mb-4'>Gia Huy</li>
                                <li className='mb-4'>Tấn Phát</li>
                                <li className='mb-4'>Thanh Phúc</li>
                            </ul>
                        </div> }
                        <div className="col-md-3 col-sm-6">
                            <h4 className='mb-4'>HỖ TRỢ</h4>
                            <ul className='list-unstyled'>
                                <li className='mb-4'>Hotline: 028-38 256 713</li>
                                <li className='mb-4'>Hướng Dẫn Khắc Phục Một Số Lỗi Không Xem Được</li>
                                <li className='mb-4'>Hướng Dẫn Đặt Hàng</li>
                                <li className='mb-4'>Hướng Dẫn Kiểm Tra Sách</li>
                                <li className='mb-4'>Quy Định Mua Hàng</li>
                            </ul>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <h4 className='mb-4'>Chính Sách</h4>
                            <ul className='list-unstyled'>
                                <li className='mb-4'>Chính Sách Đổi Trả</li>
                                <li className='mb-4'>Chính Sách Thanh Toán</li>
                                <li className='mb-4'>Bảo Mật Thông Tin</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        );
    };
    componentDidMount() {
        this.apiGetCategories();
    }
    // apis
    apiGetCategories() {
        axios.get('/api/customer/categories').then((res) => {
            const result = res.data;
            this.setState({ categories: result });
        });
    }
}

export default withRouter(Footer);
