import React, { useEffect, useState } from "react";
import { getProducts } from "../../../services/product";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getAll = async () => {
      const { data } = await getProducts();
      console.log(data);
      setProducts(data);
    };
    getAll();
  }, []);

  return (
    <div>
      <div>
        {products
          ? products.map((product) => {
              return (
                <div key={product.id}>
                  <p>Tên : {product.name}</p>
                  <p>Giá : {product.price}</p>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Home;
