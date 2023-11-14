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
        };

        case "USER": {
          return{
            ...state,
            details : action.details,
          }
        }

      default:
        return state;
    }
  };
  
  export default reducer;
  