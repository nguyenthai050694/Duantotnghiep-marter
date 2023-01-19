import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../css/vendors/styles.scss";
// import ProdcutView from "../product/ProductView";

// class Admin extends React.Component {
const Admin = () => {
  return (
    <>
      <div className="sb-nav-fixed">
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
          <NavLink className="navbar-brand ps-3" to="/">
            LuTra Store
          </NavLink>
          {/* <NavLink className="navbar-brand ps-3" to="/" activeClassName="active" >Home</NavLink> */}

          <button
            className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
            id="sidebarToggle"
            href="#!"
          >
            <i className="fas fa-bars"></i>
          </button>

          <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                placeholder="Search for..."
                aria-label="Search for..."
                aria-describedby="btnNavbarSearch"
              />
              <button
                className="btn btn-primary"
                id="btnNavbarSearch"
                type="button"
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>

          <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-5">
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-user fa-fw"></i>Dropdown
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/product"
                    activeClassName="active"
                  >
                    Action
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" href="#">
                    Another action
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <NavLink className="dropdown-item" href="#">
                    Something else here kkk
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <nav
              className="sb-sidenav accordion sb-sidenav-dark"
              id="sidenavAccordion"
            >
              <div className="sb-sidenav-menu">
                <div className="nav">
                  <div className="sb-sidenav-menu-heading">Core</div>
                  <NavLink className="nav-link" href="#">
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-tachometer-alt"></i>
                    </div>
                    Bảng điều khiển
                  </NavLink>
                  <NavLink
                    className="nav-link collapsed"
                    to="/admin/user"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseLayouts"
                    aria-expanded="false"
                    aria-controls="collapseLayouts"
                  >
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-columns"></i>
                    </div>
                    Tài khoản
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="fas fa-angle-down"></i>
                    </div>
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    to="role"
                    activeClassName="active"
                  >
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-store-alt-slash"></i>
                    </div>
                    Quyền
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    to="product"
                    activeClassName="active"
                  >
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-store-alt-slash"></i>
                    </div>
                    Sản phẩm
                  </NavLink>
                  <NavLink className="nav-link collapsed" to="/admin/category">
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-address-card"></i>
                    </div>
                    Loại sản phẩm
                  </NavLink>
                  <NavLink className="nav-link collapsed" to="/admin/order">
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-table"></i>
                    </div>
                    Đơn hàng
                  </NavLink>
                  <NavLink className="nav-link collapsed" to="/admin/voucher">
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-shopping-bag"></i>
                    </div>
                    Khuyến mãi
                  </NavLink>
                  <div className="sb-sidenav-menu-heading">Interface</div>
                  <div
                    className="collapse"
                    id="collapseLayouts"
                    aria-labelledby="headingOne"
                    data-bs-parent="#sidenavAccordion"
                  >
                    <nav className="sb-sidenav-menu-nested nav">
                      <NavLink className="nav-link" href="#">
                        Static Navigation
                      </NavLink>
                      <NavLink className="nav-link" href="#">
                        Light Sidenav
                      </NavLink>
                    </nav>
                  </div>
                  <NavLink
                    className="nav-link collapsed"
                    href="#"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapsePages"
                    aria-expanded="false"
                    aria-controls="collapsePages"
                  >
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-book-open"></i>
                    </div>
                    Pages
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="fas fa-angle-down"></i>
                    </div>
                  </NavLink>
                  <div
                    className="collapse"
                    id="collapsePages"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#sidenavAccordion"
                  >
                    <nav
                      className="sb-sidenav-menu-nested nav accordion"
                      id="sidenavAccordionPages"
                    >
                      <NavLink
                        className="nav-link collapsed"
                        href="#"
                        data-bs-toggle="collapse"
                        data-bs-target="#pagesCollapseAuth"
                        aria-expanded="false"
                        aria-controls="pagesCollapseAuth"
                      >
                        Authentication
                        <div className="sb-sidenav-collapse-arrow">
                          <i className="fas fa-angle-down"></i>
                        </div>
                      </NavLink>
                      <div
                        className="collapse"
                        id="pagesCollapseAuth"
                        aria-labelledby="headingOne"
                        data-bs-parent="#sidenavAccordionPages"
                      >
                        <nav className="sb-sidenav-menu-nested nav">
                          <NavLink className="nav-link" href="#">
                            Login
                          </NavLink>
                          <NavLink className="nav-link" href="#">
                            Register
                          </NavLink>
                          <NavLink className="nav-link" href="#">
                            Forgot Password
                          </NavLink>
                        </nav>
                      </div>
                      <NavLink
                        className="nav-link collapsed"
                        href="#"
                        data-bs-toggle="collapse"
                        data-bs-target="#pagesCollapseError"
                        aria-expanded="false"
                        aria-controls="pagesCollapseError"
                      >
                        Error
                        <div className="sb-sidenav-collapse-arrow">
                          <i className="fas fa-angle-down"></i>
                        </div>
                      </NavLink>
                      <div
                        className="collapse"
                        id="pagesCollapseError"
                        aria-labelledby="headingOne"
                        data-bs-parent="#sidenavAccordionPages"
                      >
                        <nav className="sb-sidenav-menu-nested nav">
                          <NavLink className="nav-link" href="#">
                            401 Page
                          </NavLink>
                          <NavLink className="nav-link" href="#">
                            404 Page
                          </NavLink>
                          <NavLink className="nav-link" href="#">
                            500 Page
                          </NavLink>
                        </nav>
                      </div>
                    </nav>
                  </div>
                  <div className="sb-sidenav-menu-heading">Addons</div>
                  <NavLink className="nav-link" href="#">
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-chart-area"></i>
                    </div>
                    Charts
                  </NavLink>
                  <NavLink className="nav-link" href="#">
                    <div className="sb-nav-link-icon">
                      <i className="fas fa-table"></i>
                    </div>
                    Tables
                  </NavLink>
                </div>
              </div>
              <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
              </div>
            </nav>
          </div>
          <div id="layoutSidenav_content">
            <main>
              <Outlet />
            </main>
            <footer className="py-4 bg-light mt-auto">
              <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                  <div className="text-muted">
                    Copyright &copy; LuTra Website 2022
                  </div>
                  <div>
                    <NavLink href="#">Privacy Policy</NavLink>
                    &middot;
                    <NavLink href="#">Terms &amp; Conditions</NavLink>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>

      </div>
    </>
  );
};

export default Admin;
