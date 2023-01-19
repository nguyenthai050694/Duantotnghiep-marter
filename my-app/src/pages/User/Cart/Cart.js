import React, { useState } from "react";
import products from "./product";
import { Link } from "react-router-dom";
import "./Cart.css";
import useCallGetAPI from "../../../customHook/CallGetApi";


const Cart = () => {
  const { data: media } = useCallGetAPI("http://localhost:8080/media/getAll");
  let ab = URL.createObjectURL("anhthe.jpg");
  return (
    <>
      
      {
        // media && console.log(media)
        // media.map((item) => {

        <image src={ab} />
        //   console.log(item.url);
        // })}
      }
      <div className="container-fluid">
        <h4 className="py-4">Shopping Cart</h4>
        <div className="d-flex justify-content-between align-items-center">
          <ul className="breadcrumb">
            <Link className="breadcrumb-item" to={"/"}>
              Trang Chủ
            </Link>
            <Link className="breadcrumb-item" to={"cart"}>
              Giỏ Hàng
            </Link>
          </ul>
          <p className="count">Có {products.length} Sản Phẩm Trong Giỏ Hàng</p>
        </div>
        <div className="row">
          {/* Cart-left */}
          <section className="cart-left col-8">
            <ul className="cart-list">
              {products.map((product, index) => {
                return (
                  <li
                    className="cart-item d-flex align-items-center"
                    key={index}
                  >
                    <div className="cart-infor">
                      <div className="thumbnail">
                        <a href="#">
                          <img src={product.image} alt={product.name} />
                        </a>
                      </div>
                      <div className="detail">
                        <div className="name">
                          <a href="#">{product.name}</a>
                        </div>
                        <div className="description">{product.description}</div>
                        <div className="price">{product.price}</div>
                      </div>
                    </div>

                    <div className="cart-quantity">
                      <div className="quantity">
                        <input
                          type="text"
                          className="quantity"
                          step="1"
                          value={product.quantity}
                        />
                      </div>

                      <div className="remove">
                        <svg
                          version="1.1"
                          className="close"
                          x="0px"
                          y="0px"
                          viewBox="0 0 60 60"
                          enableBackground="new 0 0 60 60"
                        >
                          <polygon points="38.936,23.561 36.814,21.439 30.562,27.691 24.311,21.439 22.189,23.561 28.441,29.812 22.189,36.064 24.311,38.186 30.562,31.934 36.814,38.186 38.936,36.064 32.684,29.812" />
                        </svg>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
          {/* Cart-right */}
          <div className="cart-right col-4 bg-light">
            <div className="summary">
              <ul>
                <li>
                  Tổng Phụ: <span>$21.97</span>
                </li>
                <li>
                  Miễn Giảm: <span>$5.00</span>
                </li>
                <li>
                  Tổng Cộng: <span>$26.97</span>
                </li>
                <li className="total">
                  Tổng: <span>{products.length}</span> Sản Phẩm
                </li>
              </ul>
            </div>

            <div className="checkout">
              <button type="button">Thanh Toán</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
