import axios from "axios";
import { getAllProducts } from "../slices/productsSlice";

export const getProducts = () => (dispatch) => {
  console.log('hola get products')
  axios
    .get("http://localhost:3001/products")

    .then((res) => {
      console.log(res.data)
      dispatch(getAllProducts(res.data))
    })

    .catch((e) => console.log(e));

};

export const postProducts = (product) => (dispatch) => {
  console.log('hola post products')
  axios.post("http://localhost:3001/products/add", product)
}
