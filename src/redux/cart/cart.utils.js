export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );
  if (existingCartItem) {
    const cleanCart = cartItems.filter((item) => item.id !== cartItemToAdd.id);
    return [
      ...cleanCart,
      { ...existingCartItem, quantity: existingCartItem.qty + 1 },
    ];
  } else {
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
  }
};
