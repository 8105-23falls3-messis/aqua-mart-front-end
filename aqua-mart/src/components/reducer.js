//Storing Backend data in the reducer

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
    default:
      return state;
  }
};

export default reducer;
