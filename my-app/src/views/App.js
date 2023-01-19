import "./App.scss";
import { ToastContainer, toast } from 'react-toastify';
import Admin from "../components/layout/Admin";
import Home from "../components/layout/Home";
import Product from "../components/product/Product";
import Role from "../components/role/Role";
import Voucher from "../components/voucher/voucher";

import User from "../components/user/User";
import Category from "../components/cate/Category";
import Cart from "../components/layout/CartPage";
import Bill from "../components/bill/Bill";
import Login from "../components/login/Login";
import Register from "../components/register/Register";

import Product1 from "../components/layout/Product";
import HeaderPage from "../components/layout/HeaderPage.js";
import ProductTest from "../components/HOME/ProductTest";
import ProductList from "../components/HOME/ProductList";
import Order from "../components/order/order";
import ProductOne from "../components/HOME/ProductOne";

import { Routes, Route } from "react-router-dom";
import OrderComponent from "../components/order-typescript/order.component";

function App() {
  return (
    <>
      <div className="App">
        {/* <header className="App-header"> */}
        <Routes>
          <Route path="/" element={<Home />}>
            {/* <Route path="cart" element={<> <Cart /></>} /> */}

            <Route
              path=""
              element={
                <>
                  {" "}
                  <HeaderPage />
                  <ProductList />
                </>
              }
            />
            <Route
              path="shop"
              element={
                <>
                  {" "}
                  <Product1 />
                </>
              }
            >
              <Route
                path=""
                element={
                  <>
                    {" "}
                    <ProductTest />
                  </>
                }
              />
            </Route>

            <Route
              path="productOne"
              element={
                <>
                  {" "}
                  <ProductOne />
                </>
              }
            ></Route>
          </Route>

          <Route
            path="admin"
            element={
              <>
                {" "}
                <Admin />
              </>
            }
          >
            <Route
              path=""
              element={
                <>
                  {" "}
                  <Product />
                  <User />
                </>
              }
            />
            <Route
              path="product"
              element={
                <>
                  {" "}
                  <Product />
                </>
              }
            />
            <Route
              path="role"
              element={
                <>
                  {" "}
                  <Role />
                </>
              }
            />
            <Route
              path="user"
              element={
                <>
                  {" "}
                  <User />
                </>
              }
            />
            <Route
              path="order"
              element={
                <>
                  {" "}
                  <OrderComponent />
                </>
              }
            />
            <Route
              path="voucher"
              element={
                <>
                  {" "}
                  <Voucher />
                </>
              }
            />
            <Route
              path="category"
              element={
                <>
                  {" "}
                  <Category />
                </>
              }
            />
          </Route>
          <Route path="cart" element={<Cart />}></Route>
          <Route path="checkout" element={<Bill />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
        </Routes>
        {/* </header> */}
      </div>
    </>
  );
}

export default App;
