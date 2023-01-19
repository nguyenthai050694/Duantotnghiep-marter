import { React, useEffect, useState } from "react";
import '../css/productTest.css';
import { useOutletContext, useNavigate } from "react-router-dom";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
    getMetadata,
} from "firebase/storage";
import { storage } from "../../Firebase";
import useCallGetAPI from '../../customHook/CallGetApi';
import ProductShear from "../HOME/Productshear";
import PaginatedItems from "../../customHook/PaginatedItems";

const ProductTest = () => {
    const [nextProductDetail, addToCart, product, dataProduct, pageable, searchButton, totalPage, setKeyword, handleCate] = useOutletContext()
    const [imageUrls, setImageUrls] = useState([]);
    const imagesListRef = ref(storage, "images/");

    useEffect(() => {
        setImageUrls([])
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                let nameImg = item.name;
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, { nameImg, url }]);
                });
            });
        });
    }, [])

    return (
        <div>
            {/* <h1 class="heading">latest <span>Products</span></h1> */}
            <section class="productTest" id="productTest">
                <div class="box-container">
                    {
                        dataProduct?.map((item, index) => {
                            return (
                                <div class="box" key={index}>
                                    <div class="content">
                                        {imageUrls.map((img) => {
                                            return (
                                                <>
                                                    {img.nameImg === item.image &&
                                                        <img src={img.url} style={{ width: "300px", height: "250px" }} />
                                                    }
                                                </>
                                            )
                                        })}
                                        <h3>{item.name}</h3>
                                        <div class="price">{item.price}</div>
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
                                    <a class="btn" onClick={() => nextProductDetail(item.id)}>Add To Cart</a>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
            <PaginatedItems itemsPerPage={totalPage?.length}
                pageable={pageable} />
        </div>
    );
}
export default ProductTest;