import React, { useContext, useEffect } from "react";
import StoreContext from "../../GlobalStates/StoreContext";
import styled from "styled-components";
import { colors } from "../../theme/variables";
import { Tag } from "../../theme/styled-componets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretUp,
  faCaretDown,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const CartItem = ({ AllProducts }) => {
  const { qtyIncr, qtyDecr, itemDelete } = useContext(StoreContext);

  function nab(a, b) {
    if (a.product.id === b.product.id) {
      return 0;
    }
    if (a.product.id < b.product.id) {
      return -1;
    }
    return 1;
  }

  useEffect(() => {}, []);

  const products = AllProducts.sort(nab);

  function handleIncr(p) {
    let incr = products.find((e) => e.product.id === p);
    if (incr.product.stock > incr.qty) {
      qtyIncr(p);
    }
  }
  function handleDecr(p) {
    qtyDecr(p);
  }
  function handleDelete(p) {
    itemDelete(p);
  }

  return (
    <>
      {products && products.length > 0 ? (
        products.map((p, i) => {
          return (
            <Item key={i}>
              <div className="div-container">
                <div className="qty">{p.qty}</div>
                <div className="product-info">
                  <Tag className="cat">{p.product.categories}</Tag>
                  <div className="name">{p.product.name}</div>
                </div>
                <div className="qty-changer">
                  {p.qty > 1 ? (
                    <button
                      className="btn-decr"
                      id={p.product.id}
                      onClick={() => handleDecr(p.product.id)}
                    >
                      <FontAwesomeIcon
                        icon={faCaretDown}
                        style={{ width: 25, height: 25 }}
                      />
                    </button>
                  ) : (
                    <button className="btn-qty-disable" id={p.product.id}>
                      <FontAwesomeIcon
                        icon={faCaretDown}
                        style={{ width: 25, height: 25 }}
                      />
                    </button>
                  )}

                  {p.product.stock > p.qty ? (
                    <button
                      className="btn-incr"
                      id={p.product.id}
                      onClick={() => handleIncr(p.product.id)}
                    >
                      <FontAwesomeIcon
                        icon={faCaretUp}
                        style={{ width: 25, height: 25 }}
                      />
                    </button>
                  ) : (
                    <button className="btn-qty-disable" id={p.product.id}>
                      <FontAwesomeIcon
                        icon={faCaretUp}
                        style={{ width: 25, height: 25 }}
                      />
                    </button>
                  )}
                </div>
                <div className="price-cont">
                  <div className="sign">$</div>
                  <div className="price">{p.subTotal}</div>
                </div>
                <div
                  className="delete-item"
                  onClick={() => handleDelete(p.product.id)}
                >
                  X
                </div>
              </div>
            </Item>
          );
        })
      ) : (
        <EmptyCart>
          Select a product{" "}
          <FontAwesomeIcon
            icon={faArrowRight}
            style={{ width: 20, height: 20 }}
          />
        </EmptyCart>
      )}
    </>
  );
};

export default CartItem;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  margin-top: 5px;
  //position: absolute;
  width: 590px;
  height: 83px;
  background: #ffffff;
  box-shadow: 4px 6px 9px -4px rgba(0, 0, 0, 0.25);
  border-radius: 0px 20px 20px 0px;
  .div-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 83px;
    position: relative;
  }
  .qty {
    //justify-content: center;
    //align-content: center;
    font-weight: 600;
    font-size: 20px;
    width: 57px;
    height: 70px;
    text-align: center;
    line-height: 70px;
    border-left: 3px solid ${colors.violet};
    border-right: 1px dashed #a1a1a1;
  }
  .btn-qty-disable {
    width: 83px;
    height: 83px;
    background-color: ${colors.grey8};
    border: none;
    font-weight: 500;
    font-size: 28px;
    color: ${colors.grey5};
  }
  .product-info {
    text-align: start;
    min-width: 255px;

    .cat {
      font-weight: 400;
      position: absolute;
      top: 12px;
      left: 52px;
    }
    .name {
      font-weight: 600;
      font-size: 18px;
      position: absolute;
      top: 42px;
      left: 52px;
    }
  }
  .qty-changer {
    display: flex;
    width: 166px;
    color: white;

    .btn-decr {
      width: 83px;
      height: 83px;
      background-color: ${colors.violet};
      border: none;
      font-weight: 500;
      font-size: 28px;
      padding-bottom: 5px;
      position: relative;

      &:active {
        color: white;
        background-color: #6044b3;
      }
    }
    .btn-incr {
      width: 83px;
      height: 83px;
      background-color: ${colors.violet};
      border: none;
      font-weight: 500;
      font-size: 28px;
      //border-left: 1px solid ${colors.lviolet};
      &:active {
        color: white;
        background-color: #6044b3;
      }
    }
    .btn-incr :hover {
      background-color: ${colors.violet};
    }
  }
  .price-cont {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 112px;
    .price {
      font-weight: 700;
      font-size: 24px;
      text-align: center;
    }
    .sign {
      font-size: 16px;
    }
  }

  .delete-item {
    cursor: pointer;
    width: 50px;
    text-align: center;
  }
`;

const EmptyCart = styled.div`
  margin-top: 20px;
  margin-left: 50px;
  font-size: 24px;
  font-weight: 600;
  font-style: italic;
  color: #adadad;
`;
