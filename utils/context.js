import { createContext } from "react";

export const OnboardingContext = createContext();
export const CartContext = createContext({
  cartItems: [],
  setCartItems: () => {},
  addItemToCart: () => {},
});
export const UserContext = createContext();
export const SavedProductsContext = createContext();
