const { createContext } = require("react");

const CartContext = createContext({
  hidden: true,
  toggleHidden:()=>{}
});

export default CartContext;
