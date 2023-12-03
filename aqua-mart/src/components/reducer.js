//Storing Backend data in the reducer

import { Cases } from "@mui/icons-material";

export const initialState = {
  user: null,
};
// //Selector

// export const getBasketTotal = (basket) =>
//   basket?.reduce((item, price) => item.price + price, 0);

const reducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.user,
        userId: action.userId,
        idRole: action.idRole,
        token: action.token,
        details: action.details,
      };
    case "USER_INFO":
      return {
        ...state,
        setUser: action.setUser,
      };
    case "USER_TOKEN":
      return {
        ...state,
        setToken: action.setToken,
      };
    case "PRODUCT":
      return {
        ...state,
        category: action.category,
        products: action.products,
        getProduct: action.getProduct,
      };
    case "PROVINCES":
      return {
        ...state,
        provinces: action.provinces,
      };
    case "COUNTRIES":
      return {
        ...state,
        countries: action.countries,
      };
      case "ProductById":
        return{
          ...state,
          productById: action.productById,
        }
    default:
      return state;
  }
};

export default reducer;
