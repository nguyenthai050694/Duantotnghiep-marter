import { React, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useCallGetAPI from "../../customHook/CallGetApi";
import '../css/stylees1.css';
import Badge from '@mui/material/Badge';
// import Scrip from "./scripts";
import logo from '../image/logo.png';
import cart1 from '../image/cart/cart-1.jpg'
import cart2 from '../image/cart/cart-2.jpg'
import cart3 from '../image/cart/cart-3.jpg'
const Header = (props) => {
    // const { data: dataCart } = useCallGetAPI(`http://localhost:8080/cart/getCart?user_Id=`)
    const { dataCart, imageUrls, searchButton, handleInputSearch, keyword } = props
    const [totalPrice, setTotalPrice] = useState()
    const [lstcart, setLstCart] = useState([])
    const [slides, setslides] = useState()
    const [navbar, setnavbar] = useState(false)
    const [cart, setcart] = useState(false)
    const [loginForm, setloginForm] = useState(false)
    const [searchForm, setsearchForm] = useState(false)


    useEffect(() => {
        let total = 0;
        const setTotal = () => {
            setLstCart(dataCart)
            dataCart.map(item => {
                total += item.price
            })
            setTotalPrice(total)
        }
        dataCart && setTotal();
    }, [dataCart]);

    useEffect(() => {
        let total = 0;
        const setTotal = () => {
            setLstCart(dataCart)
            dataCart.map(item => {
                total += item.price
            })
            setTotalPrice(total)
        }
        dataCart && setTotal();
    }, [dataCart]);

    const searchbtn = () => {
        setsearchForm(!searchForm)
        setloginForm(false)
        setcart(false)
        setnavbar(false)
    }

    const cartHover = () => {
        setsearchForm(false)
        setloginForm(false)
        setcart(!cart)
        setnavbar(false)
    }
    const cartOutHover = () => {
        setsearchForm(false)
        setloginForm(false)
        setcart(false)
        setnavbar(false)
    }

    // document.querySelector('#login-btn').onclick = () =>{
    //     loginForm.classList?.toggle('active');
    //     searchForm?.classList?.remove('active');
    //     cart?.classList?.remove('active');
    //     navbar?.classList?.remove('active');
    // }


    const menubtn = () => {
        setsearchForm(false)
        setloginForm(false)
        setcart(false)
        setnavbar(!navbar)
    }

    window.onscroll = () => {
        searchForm?.classList?.remove('active');
        cart?.classList?.remove('active');
        loginForm?.classList?.remove('active');
        navbar?.classList?.remove('active');
    }

    let index = 0;

    function next() {
        slides[index].classList?.remove('active');
        index = (index + 1) % slides.length;
        slides[index].classList?.add('active');
    }

    function prev() {
        slides[index].classList?.remove('active');
        index = (index - 1 + slides.length) % slides.length;
        slides[index].classList?.add('active');
    }

    return (
        <header class="header">

            {/* <a href="home.html" class="logo"> <i class="fas fa-shopping-basket"></i> laTra shoes </a> */}
            <NavLink to="/" class="logo"><img src={logo} alt="" width="50px" height="50px" /> laTra shoes </NavLink>

            <nav class="navbar">
                <NavLink className="navbar-brand ps-3" to="/" end >Mẫu Mới</NavLink>
                <NavLink className="navbar-brand ps-3" to="/shop" >danh mục</NavLink>
                {/* <a href="about.html">about</a>
                <a href="review.html">review</a>
                <a href="blog.html">blog</a> */}
                <NavLink className="navbar-brand ps-3" to="/admin" activeClassName="selected">Quản lý</NavLink>
            </nav>
            {navbar &&
                <nav class="navbar active">
                    <NavLink className="navbar-brand ps-3" to="/" end >Mẫu Mới</NavLink>
                    <NavLink className="navbar-brand ps-3" to="/shop" >danh mục</NavLink>
                    {/* <a href="about.html">about</a>
                    <a href="review.html">review</a>
                    <a href="blog.html">blog</a> */}
                    <NavLink className="navbar-brand ps-3" to="/admin" activeClassName="selected">Quản lý</NavLink>
                </nav>
            }

            <div class="icons">
                <div id="menu-btn" onClick={() => { menubtn() }} class="fas fa-bars"></div>
                <div id="search-btn" onClick={() => { searchbtn() }} class="fas fa-search"></div>
                <NavLink className="navbar-brand" to="/cart" activeClassName="active" style={{ marginRight: '0rem', fontSize: '1rem' }}>
                    <Badge badgeContent={dataCart.length} color="primary">
                        <div id="cart-btn" onMouseOver={() => { cartHover() }} onMouseLeave={() => { cartOutHover() }} class="fas fa-shopping-cart"></div>
                    </Badge>
                </NavLink>
                <NavLink className="navbar-brand" to="/login" style={{ marginRight: '0rem', fontSize: '1rem' }}>
                    <div id="login-btn" class="fas fa-user"></div>
                </NavLink>
            </div>

            {searchForm &&
                <form action="" class="search-form active">
                    <input type="search" placeholder="search here..." id="search-box"
                        value={keyword}
                        onChange={(e) => handleInputSearch(e)}
                    />
                    <label onClick={() => searchButton()} for="search-box" class="fas fa-search"></label>
                </form>
            }

            {cart &&
                <div class="shopping-cart active">
                    <h5 class="total"> Total : <span>{totalPrice}</span> </h5>
                    {lstcart.map((lstcart) => {
                        return (
                            <div class="box">
                                <i class="fas fa-times"></i>
                                {imageUrls.map((img) => {
                                    return (
                                        lstcart.media.map((item, index2) => {
                                            return (
                                                img.nameImg === item.url && index2 === 0 &&
                                                <img src={img.url} width='150px' height='70px' />
                                            )
                                        })
                                    )
                                })}
                                <div class="content">
                                    <h5>{lstcart.name_Product}</h5>
                                    <span class="quantity">{lstcart.quantity}</span>
                                    <span class="price">{lstcart.price * lstcart.quantity}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }

            <form action="" class="login-form ">
                <h5>login form</h5>
                <input type="email" placeholder="enter your email" class="box" />
                <input type="password" placeholder="enter your password" class="box" />
                <div class="remember">
                    <input type="checkbox" name="" id="remember-me" />
                    <label for="remember-me">remember me</label>
                </div>
                <input type="submit" value="login now" class="btn" />
                <p>forget password? <a href="#">click here</a></p>
                <p>don't have an account? <a href="#">create one</a></p>
            </form>

        </header>
    );
}
export default Header;