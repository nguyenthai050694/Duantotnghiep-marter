import React from "react";
import { CgSlack } from "react-icons/cg";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import ProductShear from "../HOME/Productshear";
import '../css/productTest.css';
import useCallGetAPI from "../../customHook/CallGetApi";
import Voucher from "../voucher/voucher";
import { create } from "@mui/material/styles/createTransitions";
// class Home extends React.Component {
const Product1 = () => {
    const [nextProductDetail, addToCart, product, dataProduct, pageable, searchButton, totalPage, setKeyword, handleCate] = useOutletContext()
    const navigate = useNavigate()
    const { data: dataCate, isLoading } = useCallGetAPI(`http://localhost:8080/api/category/select`);
    let copyCate = dataCate.content;

    return (
        <>
            {/* <Header/> */}
            {/* <ProductTest /> */}
            <Container fluid>
                {/* <Row>
                    <ProductShear />
                </Row> */}
                <h1 class="headingTest">latest <span>Products</span></h1>
                <Row>
                    <Col className="bg-light" lg="10">
                        <Outlet context={[nextProductDetail, addToCart, product, dataProduct, pageable, searchButton, totalPage, setKeyword, handleCate]} />
                    </Col>
                    <Col className="bg-light product-right" lg="2">
                        <div className="col-12 mini-card product-categori">
                            <h4 className="text-danger fw-bolder product-right-text-top">Loại sản phẩm</h4>
                            <ul className="list-group-product">
                                <li onClick={() => handleCate(0)}><CgSlack className="icon-product" /><a href="#">Tất cả</a></li>
                                {copyCate?.map(item => {
                                    return (
                                        <li onClick={() => handleCate(item.id)}><CgSlack className="icon-product" /><a href="#">{item.namecate}</a></li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div className="col mt-3 mini-card">
                            <ul className="list-group">
                                {/* {prices.map((item, index) => (
                                <div className="sidebar__item" key={index}>
                                    <div
                                    className={
                                        price.includes(item.value)
                                        ? `sidebar__item-inner active`
                                        : `sidebar__item-inner`
                                    }
                                    onClick={() => choosePriceHandler(item.value)}
                                    >
                                    <i className={item.icon}></i>
                                    <span>{item.display_name}</span>
                                    </div>
                                </div>
                                ))} */}
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
            {/* <Footer/> */}
        </>
    )
}

export default Product1;