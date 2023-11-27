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
    case "SET_USER":
      return {
        ...state,
        storedUser: action.storedUser,
      };
    case "SET_TOKEN":
      return {
        ...state,
        storedToken: action.storedToken,
      };
    case "Product":
      return {
        ...state,
        category: action.category,
      };
    case "PROVINCES":
      return {
        ...state,
        provinces: action.provinces,
      };
    default:
      return state;
  }
};

export default reducer;
