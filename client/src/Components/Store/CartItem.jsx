import React, { useContext, useState } from "react";
import StoreContext from "../../GlobalStates/StoreContext";
import styled from "styled-components";

const CartItem = ({ AllProducts }) => {
  const { qtyIncr, qtyDecr, itemDelete } = useContext(StoreContext);
  //const [total, setTotal] = useState(0);

  function nab(a, b) {
    if (a.product.id === b.product.id) {
      return 0;
    }
    if (a.product.id < b.product.id) {
      return -1;
    }
    return 1;
  }

  const products = AllProducts.sort(nab);

  // setTotal(products.product.price * products.qty)
  //         console.log(total)


  function handleIncr(p) {
    qtyIncr(p);
  }
  function handleDecr(p) {
    qtyDecr(p);
  }
  function handleDelete(p) {
    itemDelete(p);
  }

  return (
    <>
      {console.log(products)}
      {products &&
        products.map((p, i) => (
          
          <Item key={i}>
          
            <div className="div-container">
              <div className="qty">{p.qty}</div>
              <div className="product-info">
                <div className="cat">{p.product.categories}</div>
                <div className="name">{p.product.name}</div>
              </div>
              <div className="qty-changer">
                <button
                  className="btn-decr"
                  id={p.product.id}
                  onClick={() => handleDecr(p.product.id)}
                >
                  {"<"}
                </button>
                <button
                  className="btn-incr"
                  id={p.product.id}
                  onClick={() => handleIncr(p.product.id)}
                >
                  {">"}
                </button>
              </div>
              <div className="price">{p.subTotal}</div>
              <div
                className="delete-item"
                onClick={() => handleDelete(p.product.id)}
              >
                X
              </div>
            </div>
          </Item>
        ))}
    </>
  );
};

export default CartItem;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  background-color: blue;
  .div-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 83px;
  }
  .qty {
    width: 57px;
    text-align: center;
  }
  .product-info {
    text-align: start;
    min-width: 157px;
  }
  .qty-changer {
    width: 166px;
    .btn-decr {
      width: 83px;
      height: 83px;
    }
    .btn-incr {
      width: 83px;
      height: 83px;
    }
  }
  .price {
    width: 112px;
    text-align: center;
  }
  .delete-item {
    width: 50px;
    text-align: center;
  }
`;
