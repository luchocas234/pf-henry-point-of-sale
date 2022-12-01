import React, { useEffect, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getProducts,
  filterByCategoryAction,
  sortProductsAction,
  searchProductsName,
} from "../../redux/actions/productsActions";
import { getCategories } from "../../redux/actions/categoriesActions";
import StoreContext from "../../GlobalStates/StoreContext";
import Cards from "./Cards";
import Cart from "./Cart";
import "./index.css";
import { colors, BtnRounded } from "../../theme/variables";
import { SearchInput, SearchBtn, Select } from "../../theme/styled-componets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getLastCashFlowAction } from "../../redux/actions/cashFlowActions";
function Store() {
  const dispatch = useDispatch();
  const history = useHistory();
  // const { lastCashFlow } = useSelector((state) => state.cashFlow);

  const { state, products, categories, lastCashFlow } =
    useContext(StoreContext);

  const [update, setUpdate] = useState(false);

  const filterCategory = async (category) => {
    await dispatch(filterByCategoryAction(category));
  };

  function sort(e) {
    // // console.log(e.target.value);
    dispatch(sortProductsAction(e.target.value));
  }

  function handleInput(e) {
    dispatch(searchProductsName(e.target.value));
  }

  // function verifyCashFlow() {
  //   if(lastCashFlow && lastCashFlow.closeCashFlow){
  //     if (lastCashFlow && lastCashFlow.closeCashFlow === false) {
  //     console.log("Hola Si hay caja");
  //   } else if (lastCashFlow && lastCashFlow.closeCashFlow === true) {
  //     console.log("Caja Cerrada");

  //     history.push("/cashFlow");
  //   }
  //   }
  // }


  useEffect(() => {
    dispatch(getLastCashFlowAction());
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch, update]);
  return (
    <> {lastCashFlow && !lastCashFlow.closeCashFlow ? <div className="container">
        <div className="store-component">
          {/* <div className="clients-tabs">Clients</div> */}
          <div className="store-container">
            <div className="cart-container">
              <Cart products={state} update={update} setUpdate={setUpdate} />
            </div>
            <div className="products-container">
              <div className="searchnsort">
                <div className="search-product">
                  <div className="search-cont">
                    <SearchInput
                      id="input"
                      type="text"
                      placeholder="Find a product"
                      onChange={(e) => handleInput(e)}
                    ></SearchInput>

                    {/* <SearchBtn
                      id="find"
                      type="submit"
                      onClick={(e) => handleSearchBtn(e)}
                    >
                      <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{ width: 15, height: 15 }}
              />
                    </SearchBtn> */}
                  </div>
                  <div></div>
                </div>
                <div>
                  <Select onChange={(e) => sort(e)}>
                    {/* <option value="default">No sorting</option> */}
                    <option value="popular">Top seller</option>
                    <option value="unpopular">Less sold</option>
                    <option value="valuable">Highest price</option>
                    <option value="priceless">Lowest price</option>
                  </Select>
                </div>
              </div>

              <div className="category-buttons">
                <div className="sorts-container"></div>
                {categories &&
                  categories.map((categ, index) => {
                    const namer = index > 0 ? categ.name : "All";
                    return (
                      <BtnRounded
                        onClick={() => {
                          filterCategory(categ.name.toLowerCase());
                        }}
                        key={index}
                        s
                      >
                        {namer}
                      </BtnRounded>
                    );
                  })}
              </div>
              <div className="cards-container">
                {<Cards products={products} allProducts={state} />}
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: "6vh" }}>
        </div>
      </div> : history.push("/cashFlow") }
      
    </>
  );
}

export default Store;
