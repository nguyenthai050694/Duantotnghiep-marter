import React from 'react';
import '../css/styles.css';
import product1 from '../image/product/product-5.jpg';
import product2 from '../image/product/product-2.jpg';
import product3 from '../image/product/product-6.jpg';
import product4 from '../image/product/product-9.jpg';
import product5 from '../image/product/product-12.jpg';
import product6 from '../image/product/product-4.jpg';


import jordan1 from '../image/jordan/air jordan/jordan 12 retro/nike-air-jordan-12-retro-2.jpg';
import jordan2 from '../image/jordan/air jordan/jordan 12 retro/nike-air-jordan-12-retro-3.jpg';
import jordan3 from '../image/jordan/air jordan/jordan 12 retro/nike-air-jordan-12-retro-4.jpg';
import jordan4 from '../image/jordan/air jordan/jordan 12 retro/nike-air-jordan-12-retro-6.jpg';
import jordan5 from '../image/jordan/air jordan/jordan 12 retro/nike-air-jordan-12-retro-1.jpeg';

import adidas5 from '../image/adidas/giay nam/rod laver/adidas-rod-laver-1.jpg';
import adidas1 from '../image/adidas/giay nam/rod laver/adidas-rod-laver-2.jpg';
import adidas2 from '../image/adidas/giay nam/rod laver/adidas-rod-laver-6.jpg';
import adidas3 from '../image/adidas/giay nam/rod laver/adidas-rod-laver-4.jpg';
import adidas4 from '../image/adidas/giay nam/rod laver/adidas-rod-laver-5.jpg';

import sn1995 from '../image/adidas/giay nu/sn1997 x marimekko/adidas-sn1997-x-marimekko-1.jpg';
import sn1991 from '../image/adidas/giay nu/sn1997 x marimekko/adidas-sn1997-x-marimekko-2.jpg';
import sn1992 from '../image/adidas/giay nu/sn1997 x marimekko/adidas-sn1997-x-marimekko-3.jpg';
import sn1993 from '../image/adidas/giay nu/sn1997 x marimekko/adidas-sn1997-x-marimekko-4.jpg';
import sn1994 from '../image/adidas/giay nu/sn1997 x marimekko/adidas-sn1997-x-marimekko-5.jpg';

const ProductList = () => {
    return (
        <div>
            <section class="product" id="product">
                <h1 class="heading">sản phẩm <span>mới nhất</span></h1>
                <div class="box-container">
                    {/* <div class="box">
                        <div class="content">
                            <img src={product1} alt="" width="300px" height="300px" />
                            <h3>Nike Shoes</h3>
                            <div class="price">$200 <span>$150</span></div>
                            <div class="stars">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                        </div>
                        <div class="icons">
                            <a href="#" class="fa fa-heart"></a>
                            <a href="#" class="fa fa-cart-plus"></a>
                            <a href="#" class="fa fa-eye"></a>
                        </div>
                        <a href="#" class="btn">Add To Cart</a>
                    </div> */}
                    <div class="box">
                        <div class="content">
                            <img src={product2} alt="" width="300px" height="300px" />
                            <h3>Nike Shoes</h3>
                            <div class="price">$200 <span>$150</span></div>
                            <div class="stars">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                        </div>
                        <div class="icons">
                            <a href="#" class="fa fa-heart"></a>
                            <a href="#" class="fa fa-cart-plus"></a>
                            <a href="#" class="fa fa-eye"></a>
                        </div>
                        <a href="#" class="btn">Add To Cart</a>
                    </div>
                    <div class="box">
                        <div class="content">
                            <img src={product3} alt="" width="300px" height="300px" />
                            <h3>Nike Shoes</h3>
                            <div class="price">$200 <span>$150</span></div>
                            <div class="stars">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                        </div>
                        <div class="icons">
                            <a href="#" class="fa fa-heart"></a>
                            <a href="#" class="fa fa-cart-plus"></a>
                            <a href="#" class="fa fa-eye"></a>
                        </div>
                        <a href="#" class="btn">Add To Cart</a>
                    </div>
                    <div class="box">
                        <div class="content">
                            <img src={product4} alt="" width="300px" height="300px" />
                            <h3>Nike Shoes</h3>
                            <div class="price">$200 <span>$150</span></div>
                            <div class="stars">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                        </div>
                        <div class="icons">
                            <a href="#" class="fa fa-heart"></a>
                            <a href="#" class="fa fa-cart-plus"></a>
                            <a href="#" class="fa fa-eye"></a>
                        </div>
                        <a href="#" class="btn">Add To Cart</a>
                    </div>
                    <div class="box">
                        <div class="content">
                            <img src={product5} alt="" width="300px" height="300px" />
                            <h3>Nike Shoes</h3>
                            <div class="price">$200 <span>$150</span></div>
                            <div class="stars">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                        </div>
                        <div class="icons">
                            <a href="#" class="fa fa-heart"></a>
                            <a href="#" class="fa fa-cart-plus"></a>
                            <a href="#" class="fa fa-eye"></a>
                        </div>
                        <a href="#" class="btn">Add To Cart</a>
                    </div>
                    <div class="box">
                        <div class="content">
                            <img src={product6} alt="" width="300px" height="300px" />
                            <h3>Nike Shoes</h3>
                            <div class="price">$200 <span>$150</span></div>
                            <div class="stars">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                        </div>
                        <div class="icons">
                            <a href="#" class="fa fa-heart"></a>
                            <a href="#" class="fa fa-cart-plus"></a>
                            <a href="#" class="fa fa-eye"></a>
                        </div>
                        <a href="#" class="btn">Add To Cart</a>
                    </div>
                </div>
            </section>
            <section class="featured" id="fearured">
                <h1 class="heading">sản phẩm <span>bán chạy</span></h1>
                <div class="row">
                    <div class="image-container">
                        <div class="small-image">
                            <img src={jordan1} alt="" class="featured-image-1" />
                            <img src={jordan2} alt="" class="featured-image-1" />
                            <img src={jordan3} alt="" class="featured-image-1" />
                            <img src={jordan4} alt="" class="featured-image-1" />
                        </div>
                        <div class="big-image">
                            <img src={jordan5} alt="" class="big-image-1" />
                        </div>
                    </div>
                    <div class="content">
                        <h3>new nike airmac shoes</h3>
                        <div class="stars">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Fugit officiis omnis quo laboriosam velit culpa ex illo, error enim nostrum?
                        </p>
                        <div class="price">$90 <span>$120</span></div>
                        <a href="#" class="btn">add to cart</a>
                    </div>
                </div>
                <div class="row">
                    <div class="image-container">
                        <div class="small-image">
                            <img src={adidas1} alt="" class="featured-image-2" />
                            <img src={adidas2} alt="" class="featured-image-2" />
                            <img src={adidas3} alt="" class="featured-image-2" />
                            <img src={adidas4} alt="" class="featured-image-2" />
                        </div>
                        <div class="big-image">
                            <img src={adidas5} alt="" class="big-image-2" />
                        </div>
                    </div>
                    <div class="content">
                        <h3>new nike airmac shoes</h3>
                        <div class="stars">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Fugit officiis omnis quo laboriosam velit culpa ex illo, error enim nostrum?
                        </p>
                        <div class="price">$90 <span>$120</span></div>
                        <a href="#" class="btn">add to cart</a>
                    </div>
                </div>
                <div class="row">
                    <div class="image-container">
                        <div class="small-image">
                            <img src={sn1991} alt="" class="featured-image-3" />
                            <img src={sn1992} alt="" class="featured-image-3" />
                            <img src={sn1993} alt="" class="featured-image-3" />
                            <img src={sn1994} alt="" class="featured-image-3" />
                        </div>
                        <div class="big-image">
                            <img src={sn1995} alt="" class="big-image-3" />
                        </div>
                    </div>
                    <div class="content">
                        <h3>new nike airmac shoes</h3>
                        <div class="stars">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Fugit officiis omnis quo laboriosam velit culpa ex illo, error enim nostrum?
                        </p>
                        <div class="price">$90 <span>$120</span></div>
                        <a href="#" class="btn">add to cart</a>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default ProductList;