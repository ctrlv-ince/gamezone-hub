import React, { useState, useEffect } from 'react';
import { getCart, removeFromCart as removeFromCartService } from '../services/cartService';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await getCart();
        setCartItems(response.data.items);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, []);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5">Shopping Cart</h1>
      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-2">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-5 border-b"
            >
              <div className="flex items-center">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover mr-5"
                />
                <div>
                  <h2 className="text-xl font-bold">{item.product.name}</h2>
                  <p className="text-gray-500">
                    ${item.product.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <p className="mr-5">Quantity: {item.quantity}</p>
                <button
                  onClick={async () => {
                    try {
                      await removeFromCartService(item.product._id);
                      setCartItems(cartItems.filter((i) => i.product._id !== item.product._id));
                    } catch (error) {
                      console.error('Error removing item from cart:', error);
                    }
                  }}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-1">
          <div className="p-5 border rounded-lg">
            <h2 className="text-2xl font-bold mb-5">Cart Summary</h2>
            <div className="flex justify-between mb-2">
              <p>Subtotal</p>
              <p>${cartTotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Shipping</p>
              <p>$5.00</p>
            </div>
            <div className="flex justify-between font-bold text-xl">
              <p>Total</p>
              <p>${(cartTotal + 5).toFixed(2)}</p>
            </div>
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg mt-5">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;