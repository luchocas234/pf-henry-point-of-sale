import React, { useState, useContext, useEffect } from "react";
import StoreContext from "../../GlobalStates/StoreContext";
import CartItem from "./CartItem";
import styled from "styled-components";
import "./cart.css";
import { filterByCategoryAction } from "../../redux/actions/productsActions";
import { postOrdersAction } from "../../redux/actions/ordersActions";
import { useDispatch } from "react-redux";
import Modal from "../Modals/Modal";
import { colors } from "../../theme/variables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketShopping,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { ButtonCart } from "../../theme/styled-componets";
import ClearCart from "../Modals/ClearCart";
import AddDrinks from "../Modals/AddDrinks";
import { infoCashFlowAction } from "../../redux/actions/cashFlowActions";

function Cart({ products, setUpdate, update }) {
  const { deleteAll, order, totals, setComments, setMethodPayment } =
    useContext(StoreContext);
  const [checkout, setCheckout] = useState(false);
  const [clearCart, setClearCart] = useState(false);
  const [addDrinks, setAddDrinks] = useState(false);

  useEffect(() => {}, [products]);

  let dispatch = useDispatch();

  function checkDrinks() {
    let foundDrinks = products.find((d) => d.product.categories === "Drinks");
    return foundDrinks !== undefined ? true : false;
  }

  function handleCheckoutModal() {
    if (checkDrinks()) {
      setCheckout(true);
    } else {
      setAddDrinks(true);
    }
  }

  function postOrder() {
    //setCheckout(true)
    try {
      dispatch(postOrdersAction(order));
      // Dispachar info para cashflow
      dispatch(infoCashFlowAction(order));
      setUpdate(update ? false : true);
      deleteAll();
      dispatch(filterByCategoryAction("all"));
    } catch (error) {
      console.error(error);
    }
  }

  function handleDeleteAll() {
    //deleteAll();
    //sureDelete();
    setClearCart(true);
  }

  function drinksFilter(filter) {
    dispatch(filterByCategoryAction(filter));
  }

  return (
    <div className="cart-cont">
      {addDrinks ? (
        <AddDrinks
          setModalState={setAddDrinks}
          setCheckout={setCheckout}
          df={drinksFilter}
        />
      ) : null}
      {clearCart ? (
        <ClearCart setClearCart={setClearCart} deleteAll={deleteAll} />
      ) : null}
      {checkout && (
        <Modal
          total={totals}
          checkout={checkout}
          sch={setCheckout}
          setComments={setComments}
          postOrder={postOrder}
          setMethodPayment={setMethodPayment}
          df={drinksFilter}
        />
      )}
      <div className="cart">
        <div className="items">
          <div className="items-header">
            <div className="items-header-qty">qty.</div>
            <div className="items-header-prod">Products</div>
            <div className="items-header-sub">Sub-total</div>
          </div>
          <div className="items">
            {products ? <CartItem AllProducts={products} /> : null}
          </div>
        </div>
        {products.length ? (
          <Checkout>
            <button className="delete-cart" onClick={() => handleDeleteAll()}>
              <FontAwesomeIcon
                icon={faTrashCan}
                style={{ width: 25, height: 25 }}
              />
            </button>
            <div className="pay-btn">
              <ButtonCart
                className="checkout-btn"
                onClick={() => handleCheckoutModal()}
              >
                {" "}
                Checkout{" "}
                <FontAwesomeIcon
                  icon={faBasketShopping}
                  style={{ width: 35, height: 35 }}
                />
              </ButtonCart>
            </div>
            <div className="totals">
              <div className="total-label">Total</div>
              <div className="total-price">${totals}</div>
            </div>
          </Checkout>
        ) : null}
      </div>
    </div>
  );
}

export default Cart;

const Checkout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 80px;
  background: #eaeaea;
  box-shadow: 4px 6px 9px -4px rgba(0, 0, 0, 0.25);
  border-radius: 0px 20px 20px 0px;
  width: 610px;
  height: 100px;
  .checkout-btn {
    font-weight: 700;
    font-size: 32px;
    cursor: pointer;
    width: 280px;
    height: 83px;
    margin-left: 17px;
    background: #ffffff;
    border: none;
    box-shadow: 4px 2px 9px -1px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    color: ${colors.dgreen};
    background-color: ${colors.lgreen};
  }
  .delete-cart {
    font-weight: 500;
    text-align: center;
    font-size: 28px;
    padding-top: 5px;
    color: #ff4f58;
    cursor: pointer;
    background-color: #eaeaea;
    width: 61px;
    height: 61px;
    background-color: ${colors.red};
    border: none;
    box-shadow: 4px 2px 9px -1px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    margin-left: 75px;
    padding-bottom: 5px;
  }
  .totals {
    display: flex;
    flex-direction: column;
  }
  .total-label {
    color: #604f4f;
    text-align: center;
    font-weight: 700;
    font-size: 20px;
  }
  .total-price {
    width: 157px;
    height: 38px;
    font-weight: 700;
    font-size: 32px;
    text-align: center;
    padding-right: 5px;
    padding-bottom: 5px;
  }
`;
